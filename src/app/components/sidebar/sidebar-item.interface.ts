import { IUserRole } from "../../interfaces/user/user-role.interface";
import { IListIcon } from "../../interfaces/list/list-icon.interface";
import { IListLabel } from "../../interfaces/list/list-label.interface";

export interface ISidebarItem extends IListIcon, IListLabel { 
  id: number;
  parent_id?: number;
  title: string;
  role_id?: IUserRole['id'];
  router_link?: string | string[];
  children?: ISidebarItems;
}


export type ISidebarItems = Array<ISidebarItem>;