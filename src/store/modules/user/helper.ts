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
      // name: 'ChenZhaoYu',
      // description: 'Star on <a href="https://github.com/Chanzhaoyu/chatgpt-bot" class="text-blue-500" target="_blank" >GitHub</a>',
			// avatar: 'https://raw.githubusercontent.com/Chanzhaoyu/chatgpt-web/main/src/assets/avatar.jpg',
			avatar: 'https://thumbnail1.baidupcs.com/thumbnail/f4989799arb7ac931ad84c9a6682cbd4?fid=2937758048-250528-36127917263770&rt=pr&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-1wyC%2fTlwq2nyUMreQskRi1B884k%3d&expires=8h&chkbd=0&chkv=0&dp-logid=87947910070971964&dp-callid=0&time=1690009200&size=c1536_u864&quality=90&vuk=2937758048&ft=image&autopolicy=1', // name: 'ChenZhaoYu',
			name: 'xkj-chat',
			// description: 'Star on <a href="https://github.com/Chanzhaoyu/chatgpt-bot" class="text-blue-500" target="_blank" >GitHub</a>',
			description: 'free-try',
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
