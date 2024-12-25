+++
title = 'Diagram as Code'
date = 2024-12-25T19:00:03+08:00
draft = false
categories = ["technology"]
featuredImage = "/images/diagram_as_code.webp"
tags = ["ai","copilot"]


+++

Communication is one of the key skills of any good solution architect. Not only should you be able to create sound, secure and performant software designs but you also need to be able to communicate these to stakeholders. 

To visualize these complex solutions, diagrams are a handy tool and there are a lot of different software offerings out there that help with this exact use case - most popular perhaps Microsoft Visio and Enterprise Architect. 

But even though I think Visio is fairly workable, the UI can be a bit cumbersome and getting the diagrams to look *just right* can be a bit of a pain. So what to do if you are facing urgent deadlines but still want to create a visually appealing and clear visual representation of your design? Enter mingrammer *diagrams* and *chatGPT*.

# Mingrammer diagrams
## What it is and how does it compare?
[Mingrammer diagrams](https://diagrams.mingrammer.com/) is a python library that provides Diagrams as Code (DaC). This puts it in company with **Mermaid.js** and **plantUML**, which also allow you to use code/markup language to define diagrams.
The main difference between these tools are their markup language, the type of diagrams they support and the visuals they create (i.e. their visual elements, what kind of lines they use to connect the elements, colors, etc.). They all have their strength and weaknesses, but from personal experimentation, I prefer using Mermaid.js for use case and flow diagrams and Mingrammer diagrams for architecture / solution designs. 

I had three reasons for choosing diagrams over the other tools:
- It has specific stencils for a lot of different cloud ecosystems, such as Azure, AWS or GCP, so you can create vendor specific diagrams rather than generic ones
- It is fairly easy to setup and use
- The DaC language is clear and condensed

So let's dive into it a bit deeper. Mingrammer is fairly easy to setup, on Windows you only need to make sure you have one of the newer python versions running (3.7 or above) and that you installed Graphviz, which the diagram python library uses to create the graphics. So the instructions boil down to this:
1. Download [Graphviz](https://graphviz.gitlab.io/download/), export the archive and (if you don't export it to a standard program folder), add the location of the graphviz/bin path to the Windows PATH environment variable
2. Install the python diagrams library
```
py -m pip install diagrams
```
3. Create a new diagrams python file, e.g. example.py
```
# diagram.py
from diagrams import Diagram
from diagrams.aws.compute import EC2
from diagrams.aws.database import RDS
from diagrams.aws.network import ELB

with Diagram("Web Service", show=False):
    ELB("lb") >> EC2("web") >> RDS("userdb")
```

After that you only need to execute the file with python, and you can see the created diagram image in the same folder.
```
py .\example.py
```

![Example diagram](images/example_diagram.webp "800px")

# ChatGPT
So now that we setup diagrams, we have two options:
- learn the Diagram as Code language and create the images manually
- use a natural language prompt in ChatGPT so the AI helps us translate our requirements into code instead

Since a good solution architect is always busy, let's opt for option 2 and get our mighty AI overlords to do the heavy lifting. Let's assume the following example:
- we have an **application** running on an **Azure Virtual Machine** called *VM1* (e.g. a Java application)
- the Virtual Machine has a **User Assigned Managed Identity (UAMI)** assigned to it
- the application connects to an **Azure PostgreSQL Flexible Server** database named *postgresdb* as data layer using the UAMI (which is added as EntraID admin on the flexible server)
- the VM is in *Subnet1* of our **Virtual Network** *VNet1*, the database has a **Private Endpoint** in *Subnet2*, also located in *VNet1*
- we have an **Application Gateway** *AG1* in front of *VM1* to enable access from outside our intranet
- the application uses its managed identity to fetch secrets from an **Azure Key Vault** *AKV1*

Once we have written down our design, it does not take much to translate it into a ChatGPT prompt. I will be using ChatGPT 4o for this example. We are splitting the prompt into two, as ChatGPT has trouble getting all the class names correct and reviewing it in a second step works better than combining the instructions into one prompt.

### Prompt 1
> I would like to use the python diagrams library to create an Azure solution architecture diagram. Please help me create suitable code. I would like to depict the following: 
> - we have an **application** running on an **Azure Virtual Machine** called *VM1* (e.g. a Java application) 
> - the Virtual Machine has a **User Assigned Managed Identity (UAMI)** assigned to it, which originates in Azure Active Directory
> - the application connects to an **Azure PostgreSQL Flexible Server** database named *PGDB1* as data layer using the UAMI (which is added as EntraID admin on the flexible server) 
> - the VM is in *Subnet1* of our **Virtual Network** *VNet1*, the database has a **Private Endpoint** in *Subnet2*, also located in *VNet1* 
> - we have an **Application Gateway** *AG1* in front of *VM1* to enable access from outside our intranet 
> - the application uses its managed identity to fetch secrets from an **Azure Key Vault** *AKV1*, which has a **Private Endpoint** in *Subnet2*
> - show a client connecting to the application via AG1 from the public internet
> As names for the elements, please only use the names I supplied, such as VM1 and AG1 without any additional words or descriptions. The name of the diagram should be *Example applicaton architecture*. Please ensure connections from resources go to private endpoints first if the target resource has a private endpoint associated with it.

### Prompt 2
> Please check the exact class names for all resources as listed on the official diagrams.mingrammer site here: https://diagrams.mingrammer.com/docs/nodes/azure and https://diagrams.mingrammer.com/docs/nodes/generic . Do not generalize or pluralize. For example, use ApplicationGateway instead of ApplicationGateways. Be as detail oriented and precise as possible. Please correct any mistakes you found.


Using these prompts, ChatGPT generated for me the following output:
```
from diagrams import Diagram, Cluster, Edge
from diagrams.azure.network import ApplicationGateway, VirtualNetworks, Subnets, PrivateEndpoint
from diagrams.azure.compute import VM
from diagrams.azure.database import DatabaseForPostgresqlServers
from diagrams.azure.security import KeyVaults
from diagrams.azure.identity import ManagedIdentities
from diagrams.generic.device import Mobile

with Diagram("Example application architecture", show=False):
    client = Mobile("Client")

    with Cluster("VNet1"):
        with Cluster("Subnet1"):
            vm1 = VM("VM1")
            uami = ManagedIdentities("UAMI")
            vm1 - Edge(label="Assigned Identity") - uami

        with Cluster("Subnet2"):
            pgdb1_endpoint = PrivateEndpoint("PGDB1 Private Endpoint")
            akv1_endpoint = PrivateEndpoint("AKV1 Private Endpoint")

    app_gateway = ApplicationGateway("AG1")
    database = DatabaseForPostgresqlServers("PGDB1")
    keyvault = KeyVaults("AKV1")

    client >> app_gateway >> vm1
    vm1 >> Edge(label="Connects via Private Endpoint") >> pgdb1_endpoint >> database
    vm1 >> Edge(label="Fetches secrets via Private Endpoint") >> akv1_endpoint >> keyvault
```

Which generates the following output:
![Example application architecture](images/example_application_architecture.webp "800px")

Do note that the same input prompt does not necessarily produce the same output consistently and that sometimes the class names will still have some wrong names, but in this case you can just give the bot a small nudge and it should correct itself.

All in all the diagrams might not be quite as pretty as if produced manually using Visio or other tools, but for the amount of time needed, I would argue the results are quite excellent and can be readily adapted. An added bonus is that you also have a written description of the architecture handy, which is easier to store and share as well as great from an accessibility standpoint.

Happy diagramming!