// Filename: src/lib/contactIntent.ts

export type ContactIntent = "interested";

let pendingIntent: ContactIntent | null = null;
const listeners = new Set<(intent: ContactIntent) => void>();

export function requestContactIntent(intent: ContactIntent) {
  pendingIntent = intent;
  listeners.forEach((listener) => listener(intent));
}

export function consumeContactIntent(): ContactIntent | null {
  const intent = pendingIntent;
  pendingIntent = null;
  return intent;
}

export function onContactIntent(listener: (intent: ContactIntent) => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
