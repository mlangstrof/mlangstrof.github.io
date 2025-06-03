+++
title = 'Advanced Azure Policy Techniques #2: Using requestContext to target specific apiVersions'
date = 2025-03-31T18:45:03+08:00
draft = false
categories = ["technology"]
featuredImage = "/images/azure_policy_2.webp"
tags = ["azure"]


+++

In the second post of this series, I want to show you an example of using a function inside a policy definition to restrict the scope. Based on personal experience, **policy functions** are often somewhat neglected but have received significant development over the past few years. As you can see in the [official documentation](https://learn.microsoft.com/en-us/azure/governance/policy/concepts/definition-structure-policy-rule#policy-functions) Azure policy supports a wide range of functions, including:
- copyIndex()
- dateTimeAdd()
- dateTimeFromEpoch
- dateTimeToEpoch
- deployment()
- environment()
- extensionResourceId()
- listKeys()
- listSecrets()
- reference()
- resourceId()

Many of these functions are also available for ARM templates, such as *copyIndex()*, *listKeys()*, and *resourceId()*, and are very practical for operations targeting complex deployments with multiple, interdependent resources. However, a function that is perhaps less well-known is **requestContext()**.

In short, this function allows the policy to evaluate the current context of the request sent to the Azure Resource API, making it particularly useful for *deny* or *modify* policies.

The main use case I have found for this function so far is to solve a tricky issue: what if a newer API version of a resource provider introduces an additional property that you want to restrict using a *modify* policy, but:
- this API version is only available as a preview or not yet available in all regions
- this API version is not yet used by the Azure portal GUI (i.e. changes you make in the portal are not using this new version yet)
- your end users may still use old IaC templates or targeting older provider versions

In any of the above cases, creating a *modify* policy that restricts this parameter will cause the modification to fail if the parameter does not exist in the older API version.

So what is the solution? Simple: We use the **requestContext().apiVersion** function and add it as an additional condition, as you can see in the example below:

```
{
  "properties": {
    "displayName": "Modify-ServiceBusAuth",
    "description": "Modifies ServiceBus namespaces to disable local authentication",
    "parameters": {},
    "policyRule": {
      "if": {
        "allOf": [
          {
            "field": "type",
            "equals": "Microsoft.ServiceBus/namespaces"
          },
          {
            "field": "Microsoft.ServiceBus/namespaces/disableLocalAuth",
            "notEquals": true
          }
        ]
      },
      "then": {
        "effect": "modify",
        "details": {
          "conflictEffect": "audit",
          "roleDefinitionIds": [
            "providers/microsoft.authorization/roleDefinitions/090c5cfd-751d-490a-894a-3ce6f1109419"
          ],
          "operations": [
            {
              "condition": "[greaterOrEquals(requestContext().apiVersion, '2021-06-01-preview')]",
              "operation": "addOrReplace",
              "field": "Microsoft.ServiceBus/namespaces/disableLocalAuth",
              "value": true
            }
          ]
        }
      }
    },
    "versions": [
      "1.0.0"
    ]
  }
}
```

This allows us to ensure the *modify* policy is only triggered when useful and does not interfere with old versions. If we want, we can also restrict which API version(s) we allow to be used via a *deny* policy, to have even greater control.

As always I hope this article was useful to you and see you next time!
