import { EnumElementStatus } from './EnumElementStatus';
import { EnumAlignType } from './md/EnumAliagnType';
import { EnumAttributeType } from './md/EnumAttributeType';
import { EnumDateFormat } from './md/EnumDateFormat';
import { EnumMultiplicity } from './md/EnumMultiplicity';
import { EnumReferenceType } from './md/EnumReferenceType';
import { MDAttribute } from './md/MDAttribute';
import { MDEntity } from './md/MDEntity';

export abstract class BaseEntity {
  id: string;
  createdBy: string;
  createdOn: Date;
  modifiedBy: string;
  modifiedOn: Date;
  status: EnumElementStatus;

  constructor() {
    this.id = '';
    this.createdBy = '';
    this.createdOn = new Date();
    this.modifiedBy = '';
    this.modifiedOn = new Date();
    this.status = EnumElementStatus.VLD;
  }

  protected Deserialize(json: any) {
    this.id = json.Id;
    this.createdBy = json.CreatedBy;
    this.createdOn = new Date(json.CreatedOn);
    this.modifiedBy = json.ModifiedBy;
    this.modifiedOn = new Date(json.ModifiedOn);
    this.status = json.Status as EnumElementStatus;
  }


  protected static SetAttributes(entity: MDEntity, fullName: string){
    entity.PushAttribute(MDAttribute.Create('id', `${fullName}.id`,'ID', '实体ID', EnumAttributeType.ID, 'string', '', false, false, false, 50, true, true, false, false, true, false, EnumAlignType.Left, false, '', false, false,'', '', '', EnumReferenceType.DropDownList, EnumMultiplicity.None, EnumDateFormat.DateTime,'',-Infinity,Infinity,0,'是','否'));
    entity.PushAttribute(MDAttribute.Create('createdBy', `${fullName}.createdBy`,'创建人', '创建人', EnumAttributeType.Primitive, 'string', '', false, true, false, 50, true, false, false, false, true, false, EnumAlignType.Left, false, '', false, false,'', '', '', EnumReferenceType.DropDownList, EnumMultiplicity.None, EnumDateFormat.DateTime,'',-Infinity,Infinity,0,'是','否'));
    entity.PushAttribute(MDAttribute.Create('createdOn', `${fullName}.createdOn`,'创建时间', '创建时间', EnumAttributeType.Primitive, 'Date', '', false, true, false, 50, true, false, false, false, true, false, EnumAlignType.Center, false, '', false, false,'', '', '', EnumReferenceType.DropDownList, EnumMultiplicity.None, EnumDateFormat.DateTime,'',-Infinity,Infinity,0,'是','否'));
    entity.PushAttribute(MDAttribute.Create('modifiedBy', `${fullName}.modifiedBy`,'修改人', '修改人', EnumAttributeType.Primitive, 'string', '', false, true, false, 50, true, false, false, false, true, false, EnumAlignType.Left, false, '', false, false,'', '', '', EnumReferenceType.DropDownList, EnumMultiplicity.None, EnumDateFormat.DateTime,'',-Infinity,Infinity,0,'是','否'));
    entity.PushAttribute(MDAttribute.Create('modifiedOn', `${fullName}.modifiedOn`,'修改时间', '修改时间', EnumAttributeType.Primitive, 'Date', '', false, true, false, 50, true, false, false, false, true, false, EnumAlignType.Center, false, '', false, false,'', '', '', EnumReferenceType.DropDownList, EnumMultiplicity.None, EnumDateFormat.DateTime,'',-Infinity,Infinity,0,'是','否'));
    entity.PushAttribute(MDAttribute.Create('status', `${fullName}.status`,'状态', '实体状态', EnumAttributeType.Primitive, 'EnumElementStatus', '', false, false, false, 50, true, false, false, false, true, false, EnumAlignType.Left, false, '', false, false,'', '', '', EnumReferenceType.DropDownList, EnumMultiplicity.None, EnumDateFormat.DateTime,'',-Infinity,Infinity,0,'是','否'));
  }
}
