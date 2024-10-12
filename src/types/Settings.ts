export class Settings {
  autoDetectTermsAndConstitions: boolean;
  manualTriggerKeyBind: KeyboardEvent;

  constructor(
    autoDetectTermsAndConstitions: boolean,
    manualTriggerKeyBind: KeyboardEvent
  ) {
    this.autoDetectTermsAndConstitions = autoDetectTermsAndConstitions;
    this.manualTriggerKeyBind = manualTriggerKeyBind;
  }

  static default(): Settings {
    const event: KeyboardEventInit = {
      altKey: true,
      key: "n",
    };

    return new Settings(false, new KeyboardEvent("keypress", event));
  }
}
