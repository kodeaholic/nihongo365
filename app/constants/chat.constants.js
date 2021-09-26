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

const LAST_MESSAGE = {
  type: 'system',
  content: 'Admin đã tạo nhóm',
  renderTime: true,
  sendStatus: 1,
  time: 1631600000000,
  isIPhoneX: false,
  targetId: 'ADMIN_ID',
  chatInfo: {
    avatar: require('../assets/default_avatar.png'),
    id: 'ADMIN_ID',
    nickName: 'Admin',
  },
};

export const DEFAULT_ROOMS = {
  SYSTEM: {
    id: 'SYSTEM_NIHONGO365',
    roomInfo: {
      name: 'Tin nhắn toàn hệ thống',
      type: ROOM_TYPES.SYSTEM,
      lastMessage: LAST_MESSAGE,
      ownerId: 'ADMIN_ID',
      avatar: require('../assets/system_notification.png'), // 3
    },
  },
  N1: {
    id: 'DEFAULT_ROOM_N1_NIHONGO365',
    roomInfo: {
      name: 'Nhóm N1 Nihongo365',
      type: ROOM_TYPES.GROUP,
      lastMessage: LAST_MESSAGE,
      ownerId: 'ADMIN_ID',
      avatar: require('../assets/teamwork.png'),
    },
  },
  N2: {
    id: 'DEFAULT_ROOM_N2_NIHONGO365',
    roomInfo: {
      name: 'Nhóm N2 Nihongo365',
      type: ROOM_TYPES.GROUP,
      lastMessage: LAST_MESSAGE,
      ownerId: 'ADMIN_ID',
      avatar: require('../assets/teamwork.png'),
    },
  },
  N3: {
    id: 'DEFAULT_ROOM_N3_NIHONGO365',
    roomInfo: {
      name: 'Nhóm N3 Nihongo365',
      type: ROOM_TYPES.GROUP,
      lastMessage: LAST_MESSAGE,
      ownerId: 'ADMIN_ID',
      avatar: require('../assets/teamwork.png'),
    },
  },
  N4: {
    id: 'DEFAULT_ROOM_N4_NIHONGO365',
    roomInfo: {
      name: 'Nhóm N4 Nihongo365',
      type: ROOM_TYPES.GROUP,
      lastMessage: LAST_MESSAGE,
      ownerId: 'ADMIN_ID',
      avatar: require('../assets/teamwork.png'),
    },
  },
  N5: {
    id: 'DEFAULT_ROOM_N5_NIHONGO365',
    roomInfo: {
      name: 'Nhóm N5 Nihongo365',
      type: ROOM_TYPES.GROUP,
      lastMessage: LAST_MESSAGE,
      ownerId: 'ADMIN_ID',
      avatar: require('../assets/teamwork.png'),
    },
  },
};
