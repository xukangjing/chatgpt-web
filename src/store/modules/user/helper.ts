import { ss } from '@/utils/storage'

const LOCAL_NAME = 'userStorage'

export interface UserInfo {
  avatar: string
  name: string
  description: string
}

export interface UserState {
  userInfo: UserInfo
}

export function defaultSetting(): UserState {
  return {
    userInfo: {
      // avatar: 'https://raw.githubusercontent.com/Chanzhaoyu/chatgpt-web/main/src/assets/avatar.jpg',
      avatar: 'https://thumbnail1.baidupcs.com/thumbnail/19a2b99b1n40efa4236384b42cf795bc?fid=2937758048-250528-90269084088841&rt=pr&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-YykDhzA2fSXWVVw0NtBBFrgTPoE%3d&expires=8h&chkbd=0&chkv=0&dp-logid=9201037128381954061&dp-callid=0&time=1689598800&size=c1536_u864&quality=90&vuk=2937758048&ft=image&autopolicy=1',
      // name: 'ChenZhaoYu',
      name: 'xiaoba',
      description: 'Star on <a href="https://github.com/Chanzhaoyu/chatgpt-bot" class="text-blue-500" target="_blank" >GitHub</a>',
    },
  }
}

export function getLocalState(): UserState {
  const localSetting: UserState | undefined = ss.get(LOCAL_NAME)
  return { ...defaultSetting(), ...localSetting }
}

export function setLocalState(setting: UserState): void {
  ss.set(LOCAL_NAME, setting)
}
