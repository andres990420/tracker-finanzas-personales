import type { EventPayloadMaps } from "./eventPayloads.ts";
import mediator from "./mediator.ts";

export default class EventBus {
  static emit<EventName extends keyof EventPayloadMaps>(
    event: EventName,
    payload: EventPayloadMaps[EventName]
  ) {
    mediator.emit(event, payload);
  }

  static on<EventName extends keyof EventPayloadMaps>(
    event: EventName,
    listener: (payload: EventPayloadMaps[EventName]) => void
  ) {
    mediator.on(event, listener);
  }
}
