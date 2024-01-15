import { ukepIcons } from "../../../../dist/ng-ukep-icons-builder/build/ukep-icons.model";

export interface IRouterData {
  sidebar?: boolean;
  header?: boolean;
  title?: string | undefined;
  icon?: ukepIcons
}