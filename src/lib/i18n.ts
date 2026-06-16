import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  zh: {
    translation: {
      app: {
        title: '健康闯关',
        subtitle: '答题学习健康知识，挑战199关！',
      },
      nav: {
        home: '首页',
        game: '闯关',
        shop: '商店',
        ranking: '排行榜',
        profile: '我的',
        login: '登录',
        logout: '退出',
      },
      home: {
        welcome: '欢迎来到健康闯关',
        description: '通过答题学习健康知识，从感冒到癌症，挑战199个关卡！',
        startGame: '开始游戏',
        viewRanking: '查看排行榜',
        features: {
          title: '游戏特色',
          items: [
            { title: '199个关卡', desc: '从轻微疾病到严重癌症，循序渐进' },
            { title: '签到奖励', desc: '每日签到获得金币和加速卡' },
            { title: '好友助力', desc: '邀请好友帮助减少治疗时间' },
            { title: '道具商城', desc: '购买跳过卡、复活卡等道具' },
          ],
        },
      },
      game: {
        currentLevel: '当前关卡',
        question: '问题',
        submit: '提交答案',
        correct: '回答正确！',
        wrong: '回答错误！',
        nextLevel: '下一关',
        inTreatment: '正在治疗中',
        treatmentEnds: '治疗结束时间',
        days: '天',
        hours: '小时',
        minutes: '分钟',
        seconds: '秒',
        checkIn: '每日签到',
        checkedIn: '今日已签到',
        askFriend: '请好友助力',
        useSpeedCard: '使用加速卡',
        lives: '生命值',
        coins: '金币',
        skipCards: '跳过卡',
        reviveCards: '复活卡',
        speedCards: '加速卡',
      },
      shop: {
        title: '道具商城',
        buy: '购买',
        items: {
          skipCard: { name: '跳过卡', desc: '跳过当前关卡' },
          reviveCard: { name: '复活卡', desc: '恢复3点生命值' },
          speedCard: { name: '加速卡', desc: '减少3天治疗时间' },
        },
      },
      ranking: {
        title: '排行榜',
        rank: '排名',
        username: '用户名',
        level: '关卡',
        coins: '金币',
      },
      auth: {
        login: '登录',
        register: '注册',
        email: '邮箱',
        password: '密码',
        username: '用户名',
        loginButton: '登录',
        registerButton: '注册',
        noAccount: '没有账号？',
        hasAccount: '已有账号？',
      },
      common: {
        loading: '加载中...',
        error: '错误',
        success: '成功',
        confirm: '确认',
        cancel: '取消',
        close: '关闭',
      },
    },
  },
  en: {
    translation: {
      app: {
        title: 'Health Quest',
        subtitle: 'Answer questions to learn health knowledge, challenge 199 levels!',
      },
      nav: {
        home: 'Home',
        game: 'Game',
        shop: 'Shop',
        ranking: 'Ranking',
        profile: 'Profile',
        login: 'Login',
        logout: 'Logout',
      },
      home: {
        welcome: 'Welcome to Health Quest',
        description: 'Learn health knowledge through quizzes, challenge 199 levels from cold to cancer!',
        startGame: 'Start Game',
        viewRanking: 'View Ranking',
        features: {
          title: 'Features',
          items: [
            { title: '199 Levels', desc: 'From mild diseases to serious cancers, progressive difficulty' },
            { title: 'Check-in Rewards', desc: 'Daily check-in for coins and speed cards' },
            { title: 'Friend Help', desc: 'Invite friends to reduce treatment time' },
            { title: 'Item Shop', desc: 'Buy skip cards, revive cards and more' },
          ],
        },
      },
      game: {
        currentLevel: 'Current Level',
        question: 'Question',
        submit: 'Submit Answer',
        correct: 'Correct!',
        wrong: 'Wrong!',
        nextLevel: 'Next Level',
        inTreatment: 'In Treatment',
        treatmentEnds: 'Treatment Ends',
        days: 'days',
        hours: 'hours',
        minutes: 'minutes',
        seconds: 'seconds',
        checkIn: 'Daily Check-in',
        checkedIn: 'Checked in today',
        askFriend: 'Ask Friend for Help',
        useSpeedCard: 'Use Speed Card',
        lives: 'Lives',
        coins: 'Coins',
        skipCards: 'Skip Cards',
        reviveCards: 'Revive Cards',
        speedCards: 'Speed Cards',
      },
      shop: {
        title: 'Item Shop',
        buy: 'Buy',
        items: {
          skipCard: { name: 'Skip Card', desc: 'Skip current level' },
          reviveCard: { name: 'Revive Card', desc: 'Restore 3 lives' },
          speedCard: { name: 'Speed Card', desc: 'Reduce 3 days treatment time' },
        },
      },
      ranking: {
        title: 'Ranking',
        rank: 'Rank',
        username: 'Username',
        level: 'Level',
        coins: 'Coins',
      },
      auth: {
        login: 'Login',
        register: 'Register',
        email: 'Email',
        password: 'Password',
        username: 'Username',
        loginButton: 'Login',
        registerButton: 'Register',
        noAccount: "Don't have an account?",
        hasAccount: 'Already have an account?',
      },
      common: {
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
        confirm: 'Confirm',
        cancel: 'Cancel',
        close: 'Close',
      },
    },
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'zh',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
