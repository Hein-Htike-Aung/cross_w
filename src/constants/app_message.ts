export const AppMessageUrlNotFound = (url: string) => {
  return { en: `Not Found - ${url}`, my: `ရှာမတွေ့ပါ - ${url}`, cn: `` };
};

export const AppMessageModelNotFound = (model: string) => {
  return { en: `${model} not found`, my: `${model} မတွေ့ရှိပါ`, cn: `` };
};

export type languages = 'en' | 'my' | 'cn';

export const AppMessage = {
  created: {
    en: 'Created',
    my: '',
    cn: '',
  },
  updated: {
    en: 'Updated',
    my: '',
    cn: '',
  },
  deleted: {
    en: 'Deleted',
    my: '',
    cn: '',
  },
  alreadyExists: {
    en: 'Already exists',
    my: '',
    cn: '',
  },
  cannotBeDeleted: {
    en: 'Can not be deleted',
    my: '',
    cn: '',
  },
  retrievedSuccessful: {
    en: 'Retrieved successful',
    my: 'လုပ်ဆောင်ချက် အောင်မြင်သည်။',
    cn: '检察成功',
  },
  somethingWentWrong: {
    en: 'Something went wrong',
    my: '',
    cn: '',
  },
};
