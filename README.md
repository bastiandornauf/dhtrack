# Daggerheart Resource Tracker

Eine moderne Online-App zum Tracking von Ressourcen im Rollenspiel Daggerheart.

## Features

- **Standard-Ressourcen**: Hope, Armor, Hitpoints und Stress sind bereits vorkonfiguriert
- **Individuelle Tracker**: Füge 1-2 zusätzliche Ressourcen pro Charakter hinzu
- **+/- Buttons**: Einfache Erhöhung und Verringerung der Werte
- **Max-Werte einstellbar**: Jede Ressource hat einstellbare Maximalwerte
- **Visuelle Fortschrittsbalken**: Farbige Anzeige des aktuellen Status
- **Persistenz**: Automatisches Speichern im Browser (localStorage)
- **Responsive Design**: Funktioniert auf Desktop und Mobile
- **Moderne UI**: Schönes, intuitives Design

## Installation

1. Stelle sicher, dass Node.js installiert ist (Version 14 oder höher)
2. Klone das Repository oder lade die Dateien herunter
3. Öffne ein Terminal im Projektverzeichnis
4. Führe folgende Befehle aus:

```bash
npm install
npm start
```

Die App öffnet sich automatisch im Browser unter `http://localhost:3000`

## Verwendung

### Standard-Ressourcen
- **Hope**: Startet bei 3/3 (gelb)
- **Armor**: Startet bei 0/0 (blau) - Max-Wert anpassbar
- **Hitpoints**: Startet bei 20/20 (rot)
- **Stress**: Startet bei 0/10 (lila)

### Individuelle Ressourcen hinzufügen
1. Klicke auf "Neue Ressource"
2. Gib einen Namen ein (z.B. "Mana", "Rage", "Inspiration")
3. Setze aktuelle und maximale Werte
4. Wähle eine Farbe aus
5. Klicke "Hinzufügen"

### Ressourcen verwalten
- **Werte ändern**: Nutze die +/- Buttons
- **Max-Wert anpassen**: Klicke auf das Zahlenfeld rechts oben
- **Ressource entfernen**: Klicke auf das × bei benutzerdefinierten Ressourcen
- **Zurücksetzen**: Klicke "Zurücksetzen" für Standardwerte

## Technische Details

- **Framework**: React 18 mit TypeScript
- **Styling**: CSS3 mit modernen Features (Grid, Flexbox, Gradients)
- **Speicherung**: Browser localStorage
- **Responsive**: Mobile-first Design
- **Browser-Support**: Alle modernen Browser

## Projektstruktur

```
src/
├── components/
│   ├── ResourceTracker.tsx    # Einzelner Ressourcen-Tracker
│   ├── ResourceTracker.css
│   ├── AddResourceForm.tsx    # Formular für neue Ressourcen
│   └── AddResourceForm.css
├── types.ts                   # TypeScript Definitionen
├── App.tsx                    # Hauptkomponente
├── App.css                    # Hauptstyling
└── index.tsx                  # Einstiegspunkt
```

## Build für Produktion

```bash
npm run build
```

Dies erstellt einen optimierten Build im `build/` Verzeichnis, der auf einem Webserver bereitgestellt werden kann.

## Lizenz

Dieses Projekt ist Open Source und kann frei verwendet werden.
