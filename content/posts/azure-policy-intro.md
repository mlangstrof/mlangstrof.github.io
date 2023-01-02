---
author: "Max Langstrof"
date: 2023-01-02
title: Introduction to Azure Policy
---

# Introduction

One of the primary challenges when setting up any cloud (or even on-prem) environment is to ensure that all resources and any resource configuration is deployed in accordance with the defined security and compliance baselines. This ensures that no matter what is deployed or who performs the deployment, all resources in your environment will be up to spec.

Traditionally companies - especially larger ones - have created such internal guidelines in the forms of documents that detail the expectations in regards of resource configuration and put the onus on the operator/deployer. Since any manual task is always error prone, ensuring resource compliance was a difficult and laborious task and all to often only done properly when critical vulnerabilities needed to be addressed or audits on the environments were performed.

To address this issue, various tools were developed in order to ascertain and/or enforce resource compliancy. Conveniently, on Azure you can use the built-in Azure Policy service to address a lot of these challenges and use auxiliary methods where Azure Policy falls short. But first let's have a quick introduction.

# Azure Policy

Azure Policy is a service that allows you to define, audit and enforce the setup of any supported Azure resource. It makes use of the Azure Resource API to check any requests that target a resource type (such as create, update or delete) and validates if the request would result in an incompliant resource state. If so, it will trigger the resource effect, such as producing an audit log entry (audit/auditIfNotExists), reject the request (deny) or change the resource (modify/deployIfNotExists). 

Some notable features include:
- you can deploy Azure policies using the Azure portal, API as well as IaC templates (such as ARM, Bicep or Terraform). 
- you can extend Azure Policy to on-prem resources by onboarding them to Azure Arc
- you can assign policies to different scopes (such as management group, subscriptions or resource groups) - this can be used to differentiate between sandbox, development and prod environments
- you can trigger resource policy re-evaluation manually - otherwise re-evaluation when modifying an existing policy can take some time
- it is possible to create policies that are in conflict with one another - this is not evaluated, so consider your existing policies for the same resource type before deploying a new one
- you can use remediation tasks to trigger remediation of incompliant policies (this only works for DINE or Modify policies)

# Policy structure and effects
In general Azure Policy uses two seperate subresources:
- Policy definition: This resource contains the definition of which resource type and under which condition it should be triggered as well as the effect that it will execute
- Policy assignment: This resource references a policy definition, contains the scope it should be deployed at (e.g. management group, subscription) and any assignment parameters as detailed in the policy definition

## Policy definitions
A policy definition has the following structure:
- scope (definition location): Location of where the policy definition should be deployed 
- name: name of policy definition
- description: description of the policy
- parameters: any parameters that should be provided as part of the policy assignment (see below)
- policy rule: 
  - if condition: describes the condition under which the policy should trigger, such as the resource type, resource configuration, etc.
  - then block: describes the effect that should happen if the if condition is triggered
  
### Policy effects
As of the time of writing this blog post, there are four different policy effects available:
- Audit / AuditIfNotExists:
- Deny
- DeployIfNotExists
- Modify:

## Policy assignments
A policy assignment has the following structure:
- scope: scope at which the policy assignment should be deployed 
- policy definition: reference to the policy definition that this assignment will deploy
- name: name of policy assignment
- description: description of the policy
- parameters: any parameters that should be provided as part of the policy assignment

# How to start
Before starting with the creation and deployment of policies, you need to invest some thought into what resources you want to allow on your cloud estate, what configuration(s) should be allowed and how you want to ensure that the minimum baseline you thought of can be met.

link to security baseline
link to github repo

where to look up resource types

# Limitations and extensions

# Further resources
[Azure Policy Overview](https://learn.microsoft.com/en-us/azure/governance/policy/overview)
