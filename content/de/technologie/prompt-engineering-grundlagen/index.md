+++
title = 'Prompt Engineering Grundlagen'
date = 2024-11-19T21:00:03+08:00
draft = false
categories = ["technology"]
featuredImage = "/images/prompt_engineering_101.webp"
tags = ["AI","Copilot","Grundlagen"]


+++

Die vergangenen Jahre haben das (zweite) Zeitalter der KI eingeläutet. Auch wenn eine gewisse Skepsis durchaus angebracht ist, lässt sich nicht leugnen, dass viele dieser Tools extrem nützlich sind. Zu den praktischsten Anwendungen gehören KI-gestützte Chatbots wie ChatGPT, Bing/Copilot, Gemini und Grok. Diese Bots sind hervorragend darin, natürliche Sprachbefehle (wie etwa *"Bei welcher Temperatur soll ich mein Steak zubereiten?"*) zu verarbeiten, mithilfe generativer KI-Modelle Antworten zu formulieren und diese in verschiedensten Formaten zu liefern – sei es als Text, Tabellen, Bilder und vieles mehr.

Auf den ersten Blick wirkt es ganz einfach, diese Chatbots zu benutzen, doch schon nach kurzer Zeit stößt man auf ihre Grenzen. Diese Hürden liegen oft weniger an den Bots selbst (auch wenn es gelegentlich zu sogenannten Halluzinationen kommen kann) als vielmehr an der Fähigkeit des Nutzers, seine Fragen klar und präzise zu formulieren. Besonders komplexe Fragen oder Aufgaben erfordern durchdachte, gut strukturierte Text-Prompts, um wirklich sinnvolle Ergebnisse zu erhalten.

Genau hier kommt das sogenannte **Prompt Engineering** ins Spiel – ein Bereich, der sich darauf spezialisiert hat, Eingabeaufforderungen (Prompts) so zu gestalten und zu optimieren, dass bestmögliche Resultate erzielt werden. Wer diese Fähigkeit meistert, kann das volle Potenzial der mächtigen Tools ausschöpfen und erhält deutlich nuanciertere und genauere Antworten.

# Grundlagen
Ein **Prompt** ist eine **Nachricht**, die Sie an den KI-Chatbot senden, und die **Anweisungen** enthält. Diese ist meist textbasiert, doch viele Bots unterstützen auch Spracheingaben oder andere Schnittstellen. Sobald ein Prompt gesendet wird, berechnet der Chatbot eine Antwort (den **Response**) und Sie können dann erneut antworten. Dies bezeichnet man als **Konversation**.

## Elemente eines Prompts
Prompts lassen sich in verschiedene Bestandteile zerlegen. Nachfolgend finden Sie eine (nicht vollständige) Liste gängiger Elemente:
- **Rolle**: Anweisung, in einer bestimmten Rolle zu agieren, z.B. *"Tu so, als wärst du ein Botschafter. Schreibe einen formellen Entschuldigungsbrief an meine Katze, weil ich sie 5 Minuten zu spät gefüttert habe."*
- **Aufgabe**: Anweisung, eine bestimmte Aufgabe durchzuführen, z.B. *"Wandle 50 Inch in Meter um."*
- **Stil oder Ton**: Anweisung, die Antwort in einem bestimmten Ton zu formulieren, z.B. *"Schreibe in einem formellen und professionellen Ton."*
- **Kontext**: Hintergrundinfos, die für die Aufgabe relevant sind, z.B. *"Ich bin per SSH auf einem Ubuntu-Server eingeloggt und muss alle Dateien finden, die mit 'test' beginnen."*
- **Einschränkungen**: Vorgaben oder Regeln, denen die KI folgen soll, z.B. *"Verwende nur Daten ab dem Jahr 2020."*
- **Eingabesprache**: Die Sprache, in der der Prompt formuliert ist. Obwohl die meisten Chatbots mehrere Sprachen unterstützen, sollte man bedenken, in welcher Sprache das Training erfolgte. Fragen über "deutsche Backwaren" in Deutsch oder Englisch können zu unterschiedlichen Antworten führen.
- **Eingabedaten**: Alle zusätzlichen Infos oder Beispiele, die Sie in den Prompt einbetten, z.B. *"Ich mag Orangen und Äpfel sehr, aber Melonen interessieren mich nicht."*
- **Ausgabeformat**: Anweisung, wie die Antwort formatiert sein soll, z.B. *"Nenne mir die zehn beliebtesten Früchte und ihre saisonale Verfügbarkeit. Stelle das Ergebnis in einer Tabelle dar."*
- **Ausgabesprache**: Anweisung, in welcher Sprache die Antwort erfolgen soll, z.B. *"Schreibe mir eine kurze Geschichte über einen Fuchs im Wald auf Deutsch."*
- **Erklärung**: Anweisung, zu erklären, wie die Antwort zustande kam (also die Argumentation darzulegen), z.B. *"Was war der größte Faktor für die Entwicklung moderner Computer? Erkläre deine Begründung."*
- **Schritte**: Anweisung, die Antwort in mehrere Schritte zu unterteilen. Sie können auch definieren, dass nach jedem Schritt auf Feedback gewartet wird, z.B. *"Ich möchte ein Buch über Pudel schreiben. Erstelle eine Gliederung mit zehn Kapiteln. Nach jedem Kapitel warte auf mein Feedback. Wenn alle Kapitel stehen, erstelle eine Zusammenfassung."*

## Wichtige Punkte
- Verschiedene Chatbots (oder Modelle) verhalten sich unterschiedlich. Jedes Modell hat **seine eigenen Stärken und Schwächen**, also kann der gleiche Prompt in verschiedenen Bots unterschiedliche Antworten liefern.
- Bedenken Sie die **Datenquellen des Modells** (Gemini greift z.B. auf Reddit-Daten zurück). Das hat großen Einfluss auf die Art und Qualität der Antworten.
- **Trial & Error** ist wichtig, um das Modell kennenzulernen und herauszufinden, was funktioniert und was nicht.
- Die gleiche Frage kann je nach **Kontext und Länge** der bisherigen Unterhaltung zu sehr unterschiedlichen Antworten führen.
- Modelle unterscheiden sich auch darin, wie viele **Parameter **sie unterstützen (z.B. LAMA 7B = 7 Milliarden Parameter). Vereinfacht gilt: Je mehr Parameter, desto komplexer, fähiger und ausgereifter ist das Modell vermutlich.
- Haben Sie eine klare **Vorstellung**, welche Informationen Ihnen der Chatbot liefern soll. Wenn Sie z.B. nach Gesundheitsinformationen fragen (was generell im Internet nie uneingeschränkt zu empfehlen ist), werden Fragen wie *"Welchen Heilstein sollte ich bei Rückenschmerzen nutzen?"* und *"Was sollte ich bei Rückenschmerzen tun?"* ganz verschiedene Antworten provozieren. Oder diese beiden Prompts: *"Finde für mich das beste authentische italienische Pizzarezept*" vs. *"Zeige mir das beste authentische italienische Pizzarezept, aber verwende nur Quellen in italienischer Sprache von Websites mit einer .it-Domain"*. Überlegen Sie, auf welchen Datensatz der Chatbot zugreifen wird und passen Sie Ihre Frage entsprechend an. Die meisten Datensätze bevorzugen populäre Websites.
- Verwenden Sie den Prompt *"Lass uns Schritt für Schritt denken"*, wenn der Chatbot bei komplexen Fragen wiederholt versagt. Dadurch teilt der Chatbot seine Antwort in Schritte auf und baut jede weitere Antwort auf der vorherigen auf.
- Lernen Sie, eine **Sackgasse** zu erkennen. Manchmal liefert der Chatbot nicht die gewünschten Informationen, und je länger das Gespräch andauert, desto eher wiederholt er die gleichen, falschen Antworten. Wenn Sie an diesem Punkt sind, brechen Sie ab und starten Sie von vorne, vielleicht mit einer veränderten Herangehensweise, um nicht wieder in die gleiche Falle zu tappen.

# Prompt Engineering Best Practices

## Achtung beim Kontext
**Bedenken Sie, dass Ihre vorherigen Prompts im Gespräch einen Kontext schaffen**. Stellen Sie keine Fragen zu völlig anderen Themen in der gleichen Unterhaltung, da der Chatbot weiterhin durch den bestehenden Kontext beeinflusst ist und dadurch womöglich den falschen Zusammenhang herstellt. Nutzen Sie den Kontext zu Ihrem Vorteil und legen Sie ihn als ersten Schritt fest, wenn Sie komplexe oder längere Anfragen planen. Achten Sie darauf, Anweisungen und Kontext getrennt zu halten.

## Bleiben Sie auf dem Laufenden
Halten Sie sich über neue Modellversionen und Änderungen auf dem Laufenden. Nutzen Sie im Idealfall stets die aktuellsten (stabilen) Modelle, da diese am besten trainiert sind und die meisten Features bieten.

## Schreiben Sie wie ein Nachrichtensprecher
Stellen Sie sicher, dass Ihre Aussagen im Prompt **präzise, knapp und klar** sind. Vermeiden Sie Slang, Akronyme und Abkürzungen (sofern Sie diese nicht zuvor erklärt haben) oder unklare Formulierungen. Definieren Sie auch das gewünschte Ausgabeformat (Text, Liste, Tabelle, Bild usw.).

## Nutzen Sie Beispiele und Hinweise
Beispiele können helfen, Kontext zu schaffen oder ein gewünschtes Ergebnis vorzugeben. Das kann so einfach sein wie: *"Erstelle mir eine Liste von zehn Wein-Aromen, z. B. rote Früchte, schwarze Früchte, Leder"*, wodurch die KI vermutlich an die gegebenen Einträge anknüpfen wird und ähnliche Dinge auflisten wird.

Auch Hinweise ("Cues") sind ein wirksames Mittel, um die Ausgabe in die gewünschte Richtung zu lenken. Anstatt einfach zu fragen: *"Welche Autos sind derzeit in der Schweiz am beliebtesten?"* können Sie ergänzen: *"Welche Autos sind derzeit in der Schweiz am beliebtesten? Die Top 5 der beliebtesten Autos sind:"* – der Chatbot wird dann versuchen, die Antwort passend zu Ihrer vorgegebenen Struktur zu liefern.

## Betonen Sie wichtige Aspekte
Wiederholungen können helfen, bestimmte Teile oder Aspekte eines Prompts hervorzuheben. In einigen Fällen können sogar wiederholte Aufforderungen funktionieren, wenn die KI anfänglich falsche Informationen liefert. Wenn der Bot etwa sagt: *"Leider erlaubt die Firmen-API diesen Vorgang nicht."*, Sie aber sicher sind, dass dies nicht stimmt, können Sie nachhaken: *"Ich weiß, dass dies möglich ist, bitte beantworte die obige Frage."* – manchmal hilft dieser kleine Schubs.

Beachten Sie außerdem, dass die KI – ähnlich wie ein Mensch – Ihre letzten Eingaben stärker gewichtet als die vorherigen Eingaben in der selben Konversation. Überschreiben Sie also nicht unbeabsichtigt einen zuvor bewusst gesetzen Kontext bzw. gezielt formulierte Anweisungen.

