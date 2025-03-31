+++
title = 'Fortgeschrittene Azure Policy Techniken #2: Nutzung der requestContext Funktion um spezifische API-Versionen anzusteuern'
date = 2025-03-31T18:45:03+08:00
draft = false
categories = ["technology","recommendation"]
featuredImage = "/images/azure_policy_2.webp"
tags = ["azure"]


+++

Im zweiten Beitrag dieser Serie möchte ich Ihnen ein Beispiel dafür zeigen, wie eine Funktion innerhalb einer Richtliniendefinition verwendet wird, um den Geltungsbereich einzuschränken. Basierend auf persönlichen Erfahrungen werden **Richtlinienfunktionen** oft etwas vernachlässigt, haben jedoch in den letzten Jahren eine erhebliche Weiterentwicklung erfahren. Wie Sie in der [offiziellen Dokumentation](https://learn.microsoft.com/de-de/azure/governance/policy/concepts/definition-structure-policy-rule#policy-functions) sehen können, unterstützt Azure Policy eine Vielzahl von Funktionen, darunter:
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

Viele dieser Funktionen sind auch für ARM-Vorlagen verfügbar, wie zum Beispiel *copyIndex()*, *listKeys()* und *resourceId()*, und sind sehr praktisch für Operationen, die auf komplexe Bereitstellungen mit mehreren, voneinander abhängigen Ressourcen abzielen. Eine Funktion, die jedoch möglicherweise weniger bekannt ist, nennt sich **requestContext()**.

Kurz zusammengefasst, ermöglicht diese Funktion der Richtlinie, den aktuellen Kontext des an den Azure Resource API gesendeten Request zu bewerten, was sie besonders nützlich für *deny*- oder *modify*-Richtlinien macht.

Der Hauptanwendungsfall, den ich bisher für diese Funktion gefunden habe, besteht darin, das folgende knifflige Problem zu lösen: Was tun, wenn eine neuere API-Version eines Ressourcenanbieters ein zusätzliches Attribut einführt, deren Wert Sie mit einer modify-Richtlinie einschränken möchten, aber:
- diese API-Version nur als Vorschau (*preview*) verfügbar ist oder noch nicht in allen Regionen verfügbar ist
- diese API-Version noch nicht von der Azure-Portal-GUI verwendet wird (d.h. Änderungen, die Sie im Portal vornehmen, verwenden diese neue Version noch nicht)
- ihre internen Nutzer möglicherweise noch alte IaC-Vorlagen verwenden oder ältere Anbieterversionen ansteuern

In jedem dieser Fälle führt das Erstellen einer modify-Richtlinie, die diesen Parameter einschränkt, dazu, dass die Änderung fehlschlägt, wenn der Parameter in der älteren API-Version nicht existiert.

Also, was ist die Lösung? Ganz einfach: Wir verwenden die Funktion **requestContext().apiVersion** und fügen sie als zusätzliche Bedingung hinzu, wie Sie im folgenden Beispiel sehen können:

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

Auf diese Weise können wir sicherstellen, dass die modify-Richtlinie nur dann ausgelöst wird, wenn es sinnvoll ist, und nicht mit alten Versionen in Konflikt gerät. Wenn wir möchten, können wir auch einschränken, welche API-Version(en) verwendet werden dürfen, indem wir eine deny-Richtlinie einsetzen, um noch mehr Kontrolle zu haben.

Wie immer hoffe ich, dass dieser Artikel für Sie nützlich war. Bis zum nächsten Mal!
