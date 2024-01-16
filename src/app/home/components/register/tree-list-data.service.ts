import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITreeListItems } from './tree-list.interface';

@Injectable({
  providedIn: 'root'
})
export class TreeListDataService {
  
  selectItems(): Observable<ITreeListItems> {
    return of<ITreeListItems>([
      ...root,
      ...cr,
      ...mb,
      ...sb,
      ...kb,
    ])
  }
}

const random_txt_1 = `In the first place we have granted to God, and by this our\n present charter confirmed for us and our heirs forever that the English Church shall be free, and shall have her rights entire, and her liberties inviolate; and we will that it be thus observed; which is apparent from this that the freedom of elections, which is reckoned most important and very essential to the English Church, we, of our pure and unconstrained will, did grant, and did by our charter confirm and did obtain the ratification of the same from our lord, Pope Innocent III, before the quarrel arose between us and our barons: and this we will observe, and our will is that it be observed in good faith by our heirs forever. We have also granted to all freemen of our kingdom, for us and our heirs forever, all the underwritten liberties, to be had and held by them and their heirs, of us and our\n  heirs forever.`;
const random_txt_2 = `Fog everywhere. Fog up the river, where it flows among green aits and meadows; fog down the river, where it rolls deified among the tiers of \n shipping and the waterside pollutions of a great (and dirty) city. Fog on the Essex marshes, fog on the Kentish heights. Fog creeping into the cabooses of collier-brigs; fog lying out on the yards and hovering in the rigging of great ships; fog drooping on the gunwales of barges and small boats. Fog in the eyes and throats of ancient Greenwich pensioners, wheezing by the firesides of their wards; fog in the stem and bowl of the afternoon pipe of the wrathful skipper, down in his close cabin; fog cruelly pinching the toes and fingers of his shivering little apprentice boy on deck. Chance people on the bridges peeping over the parapets into a nether sky of fog, with fog all round them, as if they were up in a\n  balloon and hanging in the misty clouds.`;
const random_txt_3 = `yes and those handsome Moors all in white and turbans like\n  kings asking you to sit down in their little bit of a shop and Ronda with the old windows of the posadas 2 glancing eyes a lattice hid for her lover to kiss the iron and the wineshops half open at night and the castanets and the night we missed the boat at Algeciras the watchman going about serene with his lamp and O that awful deepdown torrent O and the sea the sea crimson sometimes like fire and the glorious sunsets and the figtrees in the Alameda gardens yes and all the queer little streets and the pink and blue and yellow houses and the rosegardens and the jessamine and geraniums and cactuses and Gibraltar as a girl where I was a Flower of the mountain yes when I put the rose in my hair like the Andalusian girls used or shall I wear a red yes and how he kissed me under the Moorish wall\n  and I thought well as well him as another and then I asked him with my eyes to ask again yes and then he asked me would I yes to say yes my mountain flower and first I put my arms around him yes and drew him down to me so he could feel my breasts all perfume yes and his heart was going like mad and yes I said yes I will Yes.`;
const random_txt_4 = `And Eurypylus, son of Euaemon, killed Hypsenor, the son of noble Dolopion, \n who had been made priest of the river Scamander,\n and was honoured among the people as though he were a god. Eurypylus gave him chase as he was flying before him, smote him with his sword upon the arm, and lopped his strong hand from off it. The bloody hand fell to the ground, and the shades of death, with fate that no man can withstand, came over his eyes. Thus furiously did the battle rage between them. As for the son of Tydeus, you could not say whether he was more among the Achaeans or the Trojans. He rushed across the plain like a winter torrent that has burst its barrier in full flood; no dykes, no walls of fruitful vineyards can embank it when it is swollen with rain from heaven, but in a moment it comes tearing onward, and lays many a field waste that many a strong man hand has reclaimed- even so were the \n dense phalanxes of the Trojans driven in rout by the son of Tydeus, and many though they were, they dared not abide his onslaught.`;
const random_txt_5 = `Because I could not stop for Death,
He kindly stopped for me;
The carriage held but just ourselves
And Immortality.

We slowly drove, he knew no haste,
And I had put away
My labor, and my leisure too,
For his civility.

We passed the school where children played,
Their lessons scarcely done;
We passed the fields of gazing grain,
We passed the setting sun.

We paused before a house that seemed
A swelling of the ground;
The roof was scarcely visible,
The cornice but a mound.

Since then 't is centuries; but each
Feels shorter than the day
I first surmised the horses' heads
Were toward eternity.`;
export const cr: ITreeListItems = [
  {
    id: 8,
    parent_id: 1,
    type: 'folder',
    file_name: 'Кредитные',
    creator_login: 'SuinovNA1',
    creator_shortname: 'Иванов И.И.',
    create_at: new Date(),
    modified_login: 'SuinovNA1',
    modified_shortname: 'Иванов И.И.',
    modified_at: new Date(),
    file_size: undefined,
    icon_name: 'folder',
    icon_class_list: 'svg-icon svg-icon-warning svg-icon-md',
  },
  {
    id: 9,
    parent_id: 1,
    type: 'folder',
    file_name: 'Малый бизнес',
    creator_login: 'SuinovNA1',
    creator_shortname: 'Иванов И.И.',
    create_at: new Date(),
    modified_login: 'SuinovNA1',
    modified_shortname: 'Иванов И.И.',
    modified_at: new Date(),
    file_size: undefined,
    icon_name: 'folder',
    icon_class_list: 'svg-icon svg-icon-warning svg-icon-md',
  },
  {
    id: 10,
    parent_id: 1,
    type: 'folder',
    file_name: 'Средний бизнес',
    creator_login: 'SuinovNA1',
    creator_shortname: 'Иванов И.И.',
    create_at: new Date(),
    modified_login: 'SuinovNA1',
    modified_shortname: 'Иванов И.И.',
    modified_at: new Date(),
    file_size: undefined,
    icon_name: 'folder',
    icon_class_list: 'svg-icon svg-icon-warning svg-icon-md',
  },
  {
    id: 11,
    parent_id: 1,
    type: 'folder',
    file_name: 'Крупный бизнес',
    creator_login: 'SuinovNA1',
    creator_shortname: 'Иванов И.И.',
    create_at: new Date(),
    modified_login: 'SuinovNA1',
    modified_shortname: 'Иванов И.И.',
    modified_at: new Date(),
    file_size: undefined,
    icon_name: 'folder',
    icon_class_list: 'svg-icon svg-icon-warning svg-icon-md',
  },
  {
    id: 12,
    parent_id: 1,
    type: 'file',
    file_name: 'Кредитный договор 1',
    file: new Blob(['Кредитный договор 1 \n ' + random_txt_1], { type: 'text/plain' }),
    creator_login: 'SuinovNA1',
    creator_shortname: 'Иванов И.И.',
    create_at: new Date(),
    modified_login: 'SuinovNA1',
    modified_shortname: 'Иванов И.И.',
    modified_at: new Date(),
    file_size: '3.2 Мб',
    icon_name: 'file',
    icon_class_list: 'svg-icon svg-icon-warning svg-icon-md',
  },
  {
    id: 13,
    parent_id: 1,
    type: 'file',
    file_name: 'Кредитный договор 2',
    file: new Blob(['Кредитный договор 2 \n ' + random_txt_2], { type: 'text/plain' }),
    creator_login: 'SuinovNA1',
    creator_shortname: 'Иванов И.И.',
    create_at: new Date(),
    modified_login: 'SuinovNA1',
    modified_shortname: 'Иванов И.И.',
    modified_at: new Date(),
    file_size: '234.2 Кб',
    icon_name: 'file',
    icon_class_list: 'svg-icon svg-icon-warning svg-icon-md',
  },
  {
    id: 14,
    parent_id: 1,
    type: 'file',
    file_name: 'Кредитный договор 3',
    file: new Blob(['Кредитный договор 3 \n ' + random_txt_3], { type: 'text/plain' }),
    creator_login: 'SuinovNA1',
    creator_shortname: 'Иванов И.И.',
    create_at: new Date(),
    modified_login: 'SuinovNA1',
    modified_shortname: 'Иванов И.И.',
    modified_at: new Date(),
    file_size: '1.6 Кб',
    icon_name: 'file',
    icon_class_list: 'svg-icon svg-icon-warning svg-icon-md',
  }
];
export const mb: ITreeListItems = [];
export const sb: ITreeListItems = [];
export const kb: ITreeListItems = [
  {
    id: 15,
    parent_id: 2,
    type: 'folder',
    file_name: 'Пустая папка',
    creator_login: 'SuinovNA1',
    creator_shortname: 'Иванов И.И.',
    create_at: new Date(),
    modified_login: 'SuinovNA1',
    modified_shortname: 'Иванов И.И.',
    modified_at: new Date(),
    file_size: undefined,
    icon_name: 'folder',
    icon_class_list: 'svg-icon svg-icon-warning svg-icon-md',
  },
  {
    id: 16,
    parent_id: 2,
    type: 'file',
    file_name: 'report 30123',
    file: new Blob(['report 30123 \n ' + random_txt_4], { type: 'text/plain' }),
    creator_login: 'SuinovNA1',
    creator_shortname: 'Иванов И.И.',
    create_at: new Date(),
    modified_login: 'SuinovNA1',
    modified_shortname: 'Иванов И.И.',
    modified_at: new Date(),
    file_size: undefined,
    icon_name: 'file',
    icon_class_list: 'svg-icon svg-icon-warning svg-icon-md',
  },
  {
    id: 17,
    parent_id: 2,
    type: 'file',
    file_name: 'Файл договора 13.11.2023.rtf',
    file: new Blob(['Файл договора 13.11.2023.rtf \n ' + random_txt_5], { type: 'text/plain' }),
    creator_login: 'SuinovNA1',
    creator_shortname: 'Иванов И.И.',
    create_at: new Date(),
    modified_login: 'SuinovNA1',
    modified_shortname: 'Иванов И.И.',
    modified_at: new Date(),
    file_size: undefined,
    icon_name: 'file',
    icon_class_list: 'svg-icon svg-icon-warning svg-icon-md',
  },
  {
    id: 18,
    parent_id: 2,
    type: 'file',
    file_name: 'Файл договора 5 12.10.2023.pdf',
    file: new Blob(['Файл договора 5 12.10.2023.pdf \n ' + random_txt_4], { type: 'text/plain' }),
    creator_login: 'SuinovNA1',
    creator_shortname: 'Иванов И.И.',
    create_at: new Date(),
    modified_login: 'SuinovNA1',
    modified_shortname: 'Иванов И.И.',
    modified_at: new Date(),
    file_size: undefined,
    icon_name: 'file',
    icon_class_list: 'svg-icon svg-icon-warning svg-icon-md',
  },
  {
    id: 19,
    parent_id: 2,
    type: 'file',
    file_name: 'Файл договора ООО Меганом 12.10.2023.pdf',
    file: new Blob(['Файл договора ООО Меганом 12.10.2023.pdf \n ' + random_txt_3], { type: 'text/plain' }),
    creator_login: 'SuinovNA1',
    creator_shortname: 'Иванов И.И.',
    create_at: new Date(),
    modified_login: 'SuinovNA1',
    modified_shortname: 'Иванов И.И.',
    modified_at: new Date(),
    file_size: '3.2 Мб',
    icon_name: 'file',
    icon_class_list: 'svg-icon svg-icon-warning svg-icon-md',
  },
  {
    id: 20,
    parent_id: 2,
    type: 'file',
    file_name: 'ИУДП.docx',
    file: new Blob(['ИУДП.docx \n ' + random_txt_2], { type: 'text/plain' }),
    creator_login: 'SuinovNA1',
    creator_shortname: 'Иванов И.И.',
    create_at: new Date(),
    modified_login: 'SuinovNA1',
    modified_shortname: 'Иванов И.И.',
    modified_at: new Date(),
    file_size: '234.2 Кб',
    icon_name: 'file',
    icon_class_list: 'svg-icon svg-icon-warning svg-icon-md',
  },
  {
    id: 21,
    parent_id: 2,
    type: 'file',
    file_name: 'Шаблон договора СБ.docx',
    file: new Blob(['Шаблон договора СБ.docx \n ' + random_txt_1], { type: 'text/plain' }),
    creator_login: 'SuinovNA1',
    creator_shortname: 'Иванов И.И.',
    create_at: new Date(),
    modified_login: 'SuinovNA1',
    modified_shortname: 'Иванов И.И.',
    modified_at: new Date(),
    file_size: '1.6 Кб',
    icon_name: 'file',
    icon_class_list: 'svg-icon svg-icon-warning svg-icon-md',
  }
];

export const root: ITreeListItems = [
  {
    id: 1,
    parent_id: undefined,
    type: 'folder',
    file_name: 'Кредитные док',
    creator_login: 'SuinovNA1',
    creator_shortname: 'Иванов И.И.',
    create_at: new Date(),
    modified_login: 'SuinovNA1',
    modified_shortname: 'Иванов И.И.',
    modified_at: new Date(),
    file_size: undefined,
    icon_name: 'folder',
    icon_class_list: 'svg-icon svg-icon-warning svg-icon-md',
  },
  {
    id: 2,
    parent_id: undefined,
    type: 'folder',
    file_name: 'Малый бизнес док',
    creator_login: 'SuinovNA1',
    creator_shortname: 'Иванов И.И.',
    create_at: new Date(),
    modified_login: 'SuinovNA1',
    modified_shortname: 'Иванов И.И.',
    modified_at: new Date(),
    file_size: undefined,
    icon_name: 'folder',
    icon_class_list: 'svg-icon svg-icon-warning svg-icon-md',
  },
  // {
  //   id: 3,
  //   parent_id: undefined,
  //   type: 'folder',
  //   file_name: 'Средний бизнес',
  //   creator_login: 'SuinovNA1',
  //   creator_shortname: 'Иванов И.И.',
  //   create_at: new Date(),
  //   modified_login: 'SuinovNA1',
  //   modified_shortname: 'Иванов И.И.',
  //   modified_at: new Date(),
  //   file_size: undefined,
  //   icon_name: 'folder',
  //   icon_class_list: 'svg-icon svg-icon-warning svg-icon-md',
  // },
  // {
  //   id: 4,
  //   parent_id: undefined,
  //   type: 'folder',
  //   file_name: 'Крупный бизнес',
  //   creator_login: 'SuinovNA1',
  //   creator_shortname: 'Иванов И.И.',
  //   create_at: new Date(),
  //   modified_login: 'SuinovNA1',
  //   modified_shortname: 'Иванов И.И.',
  //   modified_at: new Date(),
  //   file_size: undefined,
  //   icon_name: 'folder',
  //   icon_class_list: 'svg-icon svg-icon-warning svg-icon-md',
  // },
  // {
  //   id: 5,
  //   parent_id: undefined,
  //   type: 'file',
  //   file_name: 'Кредитный договор 1',
  //   creator_login: 'SuinovNA1',
  //   creator_shortname: 'Иванов И.И.',
  //   create_at: new Date(),
  //   modified_login: 'SuinovNA1',
  //   modified_shortname: 'Иванов И.И.',
  //   modified_at: new Date(),
  //   file_size: '3.2 Мб',
  //   icon_name: 'file',
  //   icon_class_list: 'svg-icon svg-icon-warning svg-icon-md',
  // },
  // {
  //   id: 6,
  //   parent_id: undefined,
  //   type: 'file',
  //   file_name: 'Кредитный договор 2',
  //   creator_login: 'SuinovNA1',
  //   creator_shortname: 'Иванов И.И.',
  //   create_at: new Date(),
  //   modified_login: 'SuinovNA1',
  //   modified_shortname: 'Иванов И.И.',
  //   modified_at: new Date(),
  //   file_size: '234.2 Кб',
  //   icon_name: 'file',
  //   icon_class_list: 'svg-icon svg-icon-warning svg-icon-md',
  // },
  // {
  //   id: 7,
  //   parent_id: undefined,
  //   type: 'file',
  //   file_name: 'Кредитный договор 3',
  //   creator_login: 'SuinovNA1',
  //   creator_shortname: 'Иванов И.И.',
  //   create_at: new Date(),
  //   modified_login: 'SuinovNA1',
  //   modified_shortname: 'Иванов И.И.',
  //   modified_at: new Date(),
  //   file_size: '1.6 Кб',
  //   icon_name: 'file',
  //   icon_class_list: 'svg-icon svg-icon-warning svg-icon-md',
  // }
];
