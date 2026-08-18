import { clearPins } from "./pins";
import { clearDraft, clearLast } from "./session";
import { clearHistory } from "./storage";
import { resetTheme } from "./theme";

export function resetAppData() {
  clearHistory();
  clearPins();
  resetTheme();
  clearDraft();
  clearLast();
}
