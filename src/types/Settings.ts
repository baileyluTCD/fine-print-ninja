/**  got rid of this stuff 
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
*/

export interface KeyBind {
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;
  key: string;
}

export class Settings {
  autoDetectTermsAndConstitions: boolean;
  manualTriggerKeyBind: KeyBind;

  constructor(
    autoDetectTermsAndConstitions: boolean,
    manualTriggerKeyBind: KeyBind
  ) {
    this.autoDetectTermsAndConstitions = autoDetectTermsAndConstitions;
    this.manualTriggerKeyBind = manualTriggerKeyBind;
  }

  static default(): Settings {
    return new Settings(false, {
      altKey: true,
      ctrlKey: false,
      metaKey: false,
      shiftKey: false,
      key: "n",
    });
  }
}
