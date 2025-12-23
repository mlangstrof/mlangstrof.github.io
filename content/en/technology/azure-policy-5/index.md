+++
title = 'Advanced Azure Policy Techniques #5: Versioning and rollout'
date = 2025-11-20T18:45:03+08:00
draft = true
categories = ["technology","recommendation"]
featuredImage = "/images/azure_policy_5.webp"
tags = ["azure"]


+++

Once you have setup your policy estate, I'm afraid the work doesn't quite stop - while you have (hopefully) a solid set of initiatives, policies and assigments that ensures all components meet your minimum security and compliance baseline, new developments will require your vigilance and adaptions to your policies - due to new threats, new cloud offerings or changes to the structure of the cloud resources and services. 

If you are using *built-in* policies, you're in luck - for these Microsoft will take care of maintenance and adaptions, as they are part of Microsoft's secure by default paradigm. Of course your resources belong to you, so while Microsoft will periodically review and adapt these policies, they are versioned too and applying a new version is up to you, since otherwise changes to the policy definition could cause problems for your resources (e.g. by enforcing TLS 1.3 when your legacy application might only support TLS 1.2). Especially DINE policy deploying changes or Deny policies preventing an incompliant resource from being updated would be very detrimental if rolled out automatically without warning and validation on your side. Azure does allow you to optionally choose to automatically enroll for minor version changes when assigning a built-in initiative, so updates are applied without any action required from your side.  So how do built-in policies handle versioning and rollout?

# Azure Policy Built-in Versioning

Since July 2024 Azure built-in policy initiatives and singular definitions have a version field, which is usable via the GUI or the API. If there are multiple versions available for the policy, it will list all options and allow you to choose as well as decide whether you want automated minor version policy updates and whether you would like to update. Minor version changes should not contain any breaking changes and generally safe to apply, while major versions should be vetted before assignment.

# Custom Policy Versioning

Of course inbuilt policies are only one part of the equation - more than likely you'll also be using custom policies. So how do we deal with versioning those?



# Policy Version Upgrade Rollout
https://thepiratebay.org/search.php?q=pluribus&all=on&search=Pirate+Search&page=0&orderby=