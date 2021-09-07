export const ROOM_TYPES = {
  SYSTEM: 'SYSTEM', // every users will see this
  GROUP: 'GROUP', // only group members will see this
  MEVSADMIN: 'MEANDADMIN', // only me and admin see this
  MEVSOTHER: 'MEVSOTHER', // only me and you see this
};

export const GROUP_PRIVACY = {
  OPEN: 'OPEN', // public group. users can search for it without being member of group
  CLOSED: 'CLOSED', // closed group. only members can search for it
};

export const AVATARS = {
  SYSTEM: require('../assets/system_notification.png'),
  GROUP: require('../assets/teamwork.png'),
  ADMIN: require('../assets/logo.png'),
  DEFAULT_USER_AVATAR: require('../assets/girl.png'),
};
