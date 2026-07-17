+++
title = 'Tipps zum Bestehen der Microsoft-Cybersecurity-Architect-Prüfung (SC-100)'
date = 2026-07-16T18:45:03+08:00
draft = false
categories = ["technologie", "empfehlung"]
featuredImage = "/images/sc-100.webp"
tags = ["azure", "cybersicherheit", "zertifizierungen"]

+++

Vor Kurzem konnte ich nach Bestehen der SC-100-Prüfung das Microsoft Certified: Cybersecurity Architect Expert Zertifikat in meine Liste an Qualifikationen aufgenommen. Diese Prüfung stand schon lange auf meiner Liste, da sie am höheren Ende von Microsofts Security-Zertifizierungsportfolio zu finden ist und zugleich zu den anspruchsvollsten zählt.

Obwohl ich mein Wissen über Azure und Microsoft-365-Services sowohl in der Breite als auch in der Tiefe als durchaus profund einstufen würde, muss ich zugeben, dass diese Prüfung definitiv herausfordernd ist. Es war zudem wenig hilfreich, dass mein Laptop mich während der Prüfung nicht nur einmal, sondern gleich zweimal mit einem charmanten Bluescreen überraschte. Daher dachte ich, ich fasse meine Erfahrungen kurz zusammen – in der Hoffnung, anderen die Prüfung damit etwas leichter zu machen.

*Hinweis: Dieser Artikel bezieht sich auf die SC-100-Prüfung und den Kompetenzkatalog, die vor der für den 28. Juli 2026 angekündigten Aktualisierung der englischsprachigen Prüfung galten. Ziehe für deine Vorbereitung stets den aktuellen Microsoft Study Guide heran.*

# Was ist die Microsoft Certified: Cybersecurity Architect Expert Zertifizierung?

Cybersecurity Architect Expert ist Microsofts Zertifizierung auf Expert-Level (also der höchsten Stufe) für die Konzeption von Sicherheitsarchitekturen innerhalb des gesamten Cloud-Ökosystems, einschließlich Azure und Microsoft 365.

Sie bestätigt, dass du geschäftliche Anforderungen und Risikovorgaben in schlüssige, durchgängige Sicherheitsarchitekturen übersetzen kannst, die an den Prinzipien von Zero Trust ausgerichtet sind. Dazu gehören Identity, Infrastruktur, Anwendungen, Daten, Geräte, Netzwerke, Security Operations und Governance.

Der Schwerpunkt liegt nicht einfach auf der Implementierung einzelner Technologien. Es wird erwartet, architektonische Zielkonflikte abzuwägen, die Sicherheitsauswirkungen geschäftlicher Entscheidungen zu erkennen und Lösungen auszuwählen, die über organisatorische und technische Grenzen hinweg sinnvoll zusammenspielen.

Die SC-100-Prüfung deckt vier zentrale Bereiche ab:

**1. Lösungen konzipieren, die an Security Best Practices und Prioritäten ausgerichtet sind (20–25 %)**  
Strategien entwerfen, die das Sicherheitsniveau einer Organisation verbessern und dabei Microsofts Security Frameworks, Architekturleitlinien und etablierte Best Practices berücksichtigen.

**2. Security Operations sowie Identity- und Compliance-Funktionen konzipieren (25–30 %)**  
Prozesse für Security Operations, Identity- und Access-Architekturen, Governance Controls sowie Compliance-Funktionen entwerfen.

**3. Sicherheitslösungen für die Infrastruktur konzipieren (25–30 %)**  
Sicherheitsarchitekturen für Hybrid- und Multicloud-Infrastrukturen, Netzwerke, Endpoints, Workloads und die unterstützenden Plattformen entwerfen.

**4. Sicherheitslösungen für Anwendungen und Daten konzipieren (20–25 %)**  
Sicherheitsarchitekturen für Anwendungen, APIs, DevOps-Prozesse, Datenplattformen und die darin verarbeiteten Informationen entwerfen.

Die Zertifizierung richtet sich in erster Linie an erfahrene Cybersecurity-Fachleute, ist jedoch ebenso wertvoll für Cloud Solution Architects, Enterprise Architects und DevSecOps Engineers.

Die Vorbereitung zwingt dich dazu, Security ganzheitlich zu betrachten und die häufig unsichtbaren Schnittstellen zwischen Cloud Services und Architekturebenen zu erkennen. Identity, Netzwerke, Infrastruktur, Anwendungen, Storage, Daten und Security Operations werden zwar häufig als getrennte Technologien behandelt, architektonische Schwachstellen entstehen jedoch oft genau dort, wo diese Bereiche aufeinandertreffen.

## Voraussetzungen

Das Bestehen der SC-100-Prüfung allein reicht nicht aus, um die Zertifizierung zu erhalten. Für das Microsoft-Certified: Cybersecurity-Architect-Expert-Badge benötigst du zusätzlich mindestens eine der folgenden aktiven Zertifizierungen auf Associate-Niveau:

* Microsoft Certified: Identity and Access Administrator Associate
* Microsoft Certified: Security Operations Analyst Associate
* Microsoft Certified: Azure Security Engineer Associate

Die genaue Zusammenstellung der Prüfung kann variieren, üblicherweise solltest du jedoch mit etwa 40 bis 60 Fragen in unterschiedlichen Formaten rechnen. Dazu können Multiple-Choice-, szenariobasierte, Drag-and-Drop-, Build-List- und Fallstudienfragen gehören.

Wahrscheinlich begegnest du auch Aufgabenblöcken nach dem Muster „Problem und Lösung“, bei denen das zugrunde liegende Szenario gleich bleibt, während sich die vorgeschlagene Lösung ändert. Diese weisen eine besondere Eigenheit auf: Sobald du in diesem Abschnitt eine Antwort abgegeben hast, kannst du nicht mehr zur vorherigen Frage zurückkehren. Für jede Frage hast du daher nur einen Versuch.

Aktuell stellt Microsoft für rollenbasierte Prüfungen auf Associate- und Expert-Niveau ohne Labs 100 Minuten Prüfungszeit bereit. Maßgeblich ist jedoch immer die bei der Buchung für deinen konkreten Termin angegebene Dauer.

Ungeplante Pausen sind erlaubt. Die Prüfungszeit läuft dabei allerdings weiter, und du kannst anschließend nicht mehr zu Fragen zurückkehren, die du vor Beginn der Pause bereits angesehen hast. 

Über die Prüfungsoberfläche kannst du außerdem auf die Dokumentation in Microsoft Learn zugreifen. Das mag zunächst wie ein Segen erscheinen und kann durchaus hilfreich sein, für die meisten Fragen ist der praktische Nutzen jedoch begrenzt. Häufig kommt es eher auf architektonisches Urteilsvermögen oder auf Details an, die über mehrere Produkte verteilt sind, als auf Fakten, die sich in einem einzelnen Artikel nachschlagen lassen.

# Wie solltest du dich vorbereiten?

Bevor ich mich an die Prüfung wagte, suchte ich nach hilfreichen Ratschlägen. Zwar fand ich einige Blogbeiträge und Diskussionen in Foren, wirklich so hilfreich wie erhofft war jedoch keiner davon. Daher folgt hier, was ich selbst gerne vorher gewusst hätte:

**Idealerweise kombinierst du drei unterschiedliche Ansätze und gewichtest sie entsprechend deinem vorhandenen Wissen und deiner praktischen Erfahrung:**

## 1. Ein breites konzeptionelles Verständnis aufbauen

Du benötigst ein grundlegendes Verständnis des gesamten Microsoft-Security-Ökosystems, darunter Azure, Microsoft Sentinel, Microsoft Defender, Microsoft Purview, Microsoft Priva, Microsoft Entra und Microsoft 365.

Für jedes Produkt und jeden Service solltest du verstehen:

* welche Security-Funktionen er bietet
* welche Probleme damit gelöst werden sollen
* wie er sich in andere Microsoft Services integriert
* welche Lizenzierungs-, Bereitstellungs- oder Architekturvoraussetzungen gelten
* wie sich seine Rolle in reinen Cloud-, Hybrid- und Multicloud-Umgebungen verändert

Hybride Szenarien sind besonders wichtig. Du solltest beispielsweise verstehen, auf welche Weise ein lokales Active Directory mit Microsoft Entra ID verbunden und erweitert werden kann, welche Identity-Funktionen in den unterschiedlichen Konfigurationen verfügbar sind und welche Microsoft-Defender-Funktionen AWS oder andere Workloads außerhalb von Azure unterstützen.

Außerdem solltest du mit Microsofts wichtigsten Security Frameworks und Architekturleitlinien vertraut sein, darunter die Microsoft Cybersecurity Reference Architectures, das Cloud Adoption Framework, das Azure Well-Architected Framework und der Rapid Modernization Plan.

Auf der [offiziellen Microsoft-Learn-Seite](https://learn.microsoft.com/en-us/credentials/certifications/exams/sc-100/) findest du eigene Lernpfade für jeden der vier Prüfungsbereiche. Sie sind hilfreich und umfassend, allerdings auch zeitintensiv.

Ich nutzte die Lernpfade vor allem, um Themen zu vertiefen, bei denen ich mich weniger sicher fühlte. Den größten Teil meiner Vorbereitung absolvierte ich dagegen mit mehreren Udemy-Kursen, da ich videobasierte Lernformate grundsätzlich bevorzuge.

Als ersten Einstieg kann ich außerdem [John Savills SC-100 Study Cram Video](https://www.youtube.com/watch?v=2Qu5gQjNQh4) ausdrücklich empfehlen. Es bietet eine klare und kompakte Übersicht über die Prüfungsbereiche und zeigt – noch wichtiger – wie die verschiedenen Themen miteinander zusammenhängen.

## 2. Praktische Erfahrung sammeln

SC-100 deckt ein außerordentlich breites Spektrum an Services und Funktionen ab. Idealerweise solltest du mit möglichst vielen davon praktische Hands-on-Erfahrung gesammelt haben.

Du musst nicht jedes Produkt bis ins operative Detail beherrschen. Du solltest jedoch zumindest wissen, wie die wichtigsten Portale aufgebaut sind, wo zentrale Steuerungs- und Sicherheitsfunktionen konfiguriert werden und wie die einzelnen Services zueinander positioniert sind.

Ich empfehle, eine Sandbox- oder Playground-Umgebung einzurichten und darin eine repräsentative Auswahl an Services zu konfigurieren, insbesondere:

* Microsoft Entra ID
* Azure Policy
* Microsoft Defender for Cloud
* Microsoft Defender XDR
* Microsoft Sentinel
* Microsoft Purview
* Microsoft Priva
* relevante Security- und Compliance-Funktionen in Microsoft 365

Testabonnements und begrenzte kostenlose Angebote ermöglichen einen Teil davon auch ohne dauerhaft verfügbare Enterprise-Umgebung. Verfügbarkeit und Lizenzbedingungen ändern sich allerdings regelmäßig.

Sobald du diese Services tatsächlich selbst verwendet hast, fällt es erheblich leichter, zwischen Tools zu unterscheiden, deren Bezeichnungen, Portale und Funktionsbereiche andernfalls schnell ineinander verschwimmen.

Microsoft stellt außerdem eine [Sammlung von SC-100-Labs](https://github.com/MicrosoftLearning/SC-100-Microsoft-Cybersecurity-Architect/tree/master/Instructions/Labs) bereit, mit denen du dich näher mit den relevanten Technologien vertraut machen kannst.

## 3. Fallstudien

Viele Online-Kurse enthalten Fallstudien, die den Aufgaben in der Prüfung ähneln. Zusätzlich gibt es eine offizielle Sammlung auf [Microsoft Learning](https://microsoftlearning.github.io/SC-100-Microsoft-Cybersecurity-Architect/). Du kannst auch eigene Szenarien entwickeln oder sie mithilfe eines AI Tools erstellen lassen.

Der genaue Inhalt einer Fallstudie ist weniger entscheidend als die Denkweise, die du damit einübst.

Konkret musst du lernen:

* relevante Anforderungen von Kontextinformationen und Ablenkungen zu trennen
* geschäftliche Anforderungen technischen Sicherheitsmaßnahmen zuzuordnen
* Widersprüche zwischen formulierten Anforderungen zu erkennen
* architektonische Abhängigkeiten und Randbedingungen zu identifizieren
* die Lösung auszuwählen, die sämtliche Anforderungen mit möglichst wenig unnötiger Komplexität erfüllt

Eine Referenzarchitektur kann beispielsweise von Microsoft verwaltete Schlüssel (Microsoft Managed Keys) als Standardansatz empfehlen, während der Kunde ausdrücklich die Kontrolle über seine eigenen Verschlüsselungsschlüssel verlangt. Diese eine Anforderung schließt die Standardempfehlung aus und führt stattdessen zu einem Design mit vom Kunden verwalteten Schlüsseln (Customer Managed Keys).

Genau diese Art des Denkens wird in der Prüfung erwartet. Das Auswendiglernen isolierter Produktfunktionen reicht nicht aus.

Abschließend empfehle ich Microsofts kostenloses [Practice Assessment](https://learn.microsoft.com/credentials/certifications/exams/sc-100/practice/assessment?assessment-type=practice&assessmentId=87).

Es vermittelt dir ein Gefühl für die Fragen, die dir begegnen können, und zeigt, in welchen Bereichen du bereits gut aufgestellt bist und wo noch weiterer Vorbereitungsbedarf besteht. Wenn du durchgängig mehr als 80 % erreichst, ist das ein positives Signal. Als Garantie dafür, dass du für die eigentliche Prüfung bereit bist, solltest du es jedoch nicht betrachten.

# Was ist die beste Prüfungsstrategie?

* **Atme dreimal tief durch, bevor du beginnst.** Du musst eine große Menge an Informationen verarbeiten, und wenn du durch die ersten Fragen hetzt, gewinnst du dadurch nur wenig.
* **Lies jede Frage sorgfältig.** Mir begegneten einige Fangfragen, deren Formulierung zunächst detailliertes Wissen über eine ungewöhnlich spezifische Funktion oder Konfiguration zu verlangen schien. Tatsächlich ließ sich die Antwort mitunter aus einem grundlegenden Sicherheitsprinzip ableiten. Eine Frage zur Konfiguration einer Conditional-Access-Richtlinie lief beispielsweise letztlich auf das Zero-Trust-Prinzip hinaus, explizit zu verifizieren und weitreichende oder pauschale Ausnahmen zu vermeiden.
* **Setze deine Zeit bewusst ein und vertraue deinem Urteil.** Ich halte viel davon, Fragen entschlossen zu beantworten und eine getroffene Entscheidung nicht unnötig mehrfach infrage zu stellen. Dein erster Instinkt liegt häufig richtig. Wenn du kontinuierlich vorankommst, erhältst du außerdem ein besseres Gefühl dafür, wie viel Zeit dir noch bleibt. Markiere und überspringe eine Frage nur, wenn du wirklich keinerlei Ansatz hast.
* **Nutze Microsoft Learn sparsam.** Die Versuchung ist groß, schnell die Dokumentation zu einer bestimmten Technologie oder einem Service durchzulesen, damit kannst du jedoch sehr schnell unter Zeitdruck geraten. Versuche nicht, jede Antwort durch einen Abgleich mit der Dokumentation endgültig abzusichern. Nutze sie nur bei echter Unsicherheit und **wenn die jeweilige Frage es zulässt**. Überlege außerdem, ob die betreffende Funktion oder Konfiguration wahrscheinlich in einem vorhandenen Artikel dokumentiert ist. Falls nicht, lohnt es sich vermutlich nicht, deine verbleibende Zeit mit der Suche danach zu verbringen.
* **Denke wie ein Architekt.** Suche nicht lediglich nach einer technisch gültigen Antwort. Entscheidend ist die Lösung, die sämtliche Anforderungen erfüllt und zugleich Randbedingungen wie Kosten, administrativen Aufwand, die bestehende Architektur und das Prinzip von Least Privilege berücksichtigt.

Die SC-100-Prüfung ist anspruchsvoll, weil sie Breite, Tiefe und architektonisches Denkvermögen zugleich prüft. Selbst umfangreiche Erfahrung mit Azure oder Microsoft 365 ersetzt nicht das Verständnis dafür, wie das gesamte Microsoft-Security-Ökosystem zusammenspielt.

Ich hoffe, dieser Artikel hilft dir weiter – und wünsche viel Erfolg bei der Prüfung.
