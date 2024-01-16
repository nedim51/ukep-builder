import { IListIcon } from "../../../interfaces/list/list-icon.interface";
import { IListLabel } from "../../../interfaces/list/list-label.interface";
import { IUserRole } from "../../../interfaces/user/user-role.interface";


export type ITreeExplorerItemType = 'folder' | 'file';

export interface ITreeListItem extends IListIcon, IListLabel { 
  id: number;
  parent_id?: number;
  type: ITreeExplorerItemType;
  file_name: string;
  file?: File | Blob;
  creator_login: string;
  creator_shortname: string;
  create_at: Date,
  modified_login: string;
  modified_shortname: string;
  modified_at: Date,
  file_size: string | undefined,
  
  role_id?: IUserRole['id'];
  router_link?: string | string[];
  children?: ITreeListItems;
}

export type ITreeListItems = Array<ITreeListItem>;