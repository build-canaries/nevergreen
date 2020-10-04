import {useCheckForNewVersion} from "./CheckForNewVersionHook";

interface CheckForNewVersionProps {
  readonly setNotification: (notification: string) => void;
}

export function CheckForNewVersion({setNotification}: CheckForNewVersionProps) {
  useCheckForNewVersion(setNotification)
  return null;
}
