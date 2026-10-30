// 功能：
// 1. 国内网站直连
// 2. 国外默认代理
// 3. AI 独立代理组
// 4. YouTube / Netflix / Disney+ / TikTok 等独立代理组
// 5. 地区节点自动测速
// 6. 手动选择
// 7. 负载均衡
// 8. DNS 优化
//

// ============================================================
// 一、基础配置
// ============================================================

const proxyName = "🛜代理选择";


// ============================================================
// 二、功能开关
// ============================================================

const ruleOptions = {
  apple: true,
  microsoft: true,
  github: true,
  google: true,

  openai: true,

  spotify: true,
  youtube: true,

  bahamut: true,

  netflix: true,
  tiktok: true,
  disney: true,

  pixiv: true,
  hbo: true,

  "media-hk": true,
  biliintl: true,

  hulu: true,
  primevideo: true,

  telegram: true,
  line: true,
  whatsapp: true,

  games: true
};


// ============================================================
// 三、地区节点分类
// ============================================================

const regionDefinitions = [

  {
    name: "🇭🇰香港",
    regex: /香港|港|HK|Hong.*Kong|🇭🇰/i
  },

  {
    name: "🇹🇼台湾",
    regex: /台湾|台|TW|Taiwan|🇹🇼/i
  },

  {
    name: "🇯🇵日本",
    regex: /日本|日|JP|Japan|🇯🇵/i
  },

  {
    name: "🇰🇷韩国",
    regex: /韩国|韩|KR|Korea|🇰🇷/i
  },

  {
    name: "🇸🇬新加坡",
    regex: /新加坡|狮城|SG|Singapore|🇸🇬/i
  },

  {
    name: "🇺🇸美国",
    regex: /美国|美|USA|US|United States|American|🇺🇸/i
  },

  {
    name: "🇨🇦加拿大",
    regex: /加拿大|CA|Canada|🇨🇦/i
  },

  {
    name: "🇬🇧英国",
    regex: /英国|英|UK|United.*Kingdom|Britain|🇬🇧/i
  },

  {
    name: "🇩🇪德国",
    regex: /德国|德|DE|Germany|🇩🇪/i
  },

  {
    name: "🇫🇷法国",
    regex: /法国|法|FR|France|🇫🇷/i
  },

  {
    name: "🇳🇱荷兰",
    regex: /荷兰|NL|Netherlands|🇳🇱/i
  },

  {
    name: "🇷🇺俄罗斯",
    regex: /俄罗斯|俄|RU|Russia|🇷🇺/i
  },

  {
    name: "🇹🇷土耳其",
    regex: /土耳其|TR|Turkey|🇹🇷/i
  },

  {
    name: "🇦🇺澳大利亚",
    regex: /澳大利亚|澳|AU|Australia|Sydney|🇦🇺/i
  },

  {
    name: "🇦🇷阿根廷",
    regex: /阿根廷|AR|Argentina|🇦🇷/i
  },

  {
    name: "🇮🇳印度",
    regex: /印度|IN|India|🇮🇳/i
  },

  {
    name: "🇹🇭泰国",
    regex: /泰国|TH|Thailand|🇹🇭/i
  },

  {
    name: "🇵🇭菲律宾",
    regex: /菲律宾|PH|Philippines|🇵🇭/i
  },

  {
    name: "🇲🇾马来西亚",
    regex: /马来西亚|马来|MY|Malaysia|🇲🇾/i
  },

  {
    name: "🇦🇪阿联酋",
    regex: /阿联酋|迪拜|AE|UAE|Dubai|🇦🇪/i
  }

];


// ============================================================
// 四、服务规则
//
// 全部尽量使用 DOMAIN-SUFFIX / DOMAIN-KEYWORD
// 避免依赖 geosite.dat 中具体分类名称。
// ============================================================

const serviceConfigs = [

  // ----------------------------------------------------------
  // AI
  // ----------------------------------------------------------

  {
    key: "openai",
    name: "🤖AI服务",

    url: "https://chat.openai.com/cdn-cgi/trace",

    rules: [

      // OpenAI / ChatGPT
      "DOMAIN-SUFFIX,openai.com,🤖AI服务",
      "DOMAIN-SUFFIX,chatgpt.com,🤖AI服务",
      "DOMAIN-SUFFIX,oaistatic.com,🤖AI服务",
      "DOMAIN-SUFFIX,oaiusercontent.com,🤖AI服务",

      // Claude
      "DOMAIN-SUFFIX,anthropic.com,🤖AI服务",
      "DOMAIN-SUFFIX,claude.ai,🤖AI服务",
      "DOMAIN-SUFFIX,claude.com,🤖AI服务",

      // Gemini
      "DOMAIN-SUFFIX,gemini.google.com,🤖AI服务",
      "DOMAIN-SUFFIX,ai.google.dev,🤖AI服务",

      // Meta AI
      "DOMAIN-SUFFIX,meta.ai,🤖AI服务",
      "DOMAIN-SUFFIX,meta.com,🤖AI服务",

      // 其他 AI
      "DOMAIN-SUFFIX,perplexity.ai,🤖AI服务",
      "DOMAIN-SUFFIX,poe.com,🤖AI服务"
    ]
  },


  // ----------------------------------------------------------
  // YouTube
  // ----------------------------------------------------------

  {
    key: "youtube",
    name: "📹YouTube",

    url: "https://www.youtube.com/s/desktop/494dd881/img/favicon.ico",

    rules: [
      "DOMAIN-SUFFIX,youtube.com,📹YouTube",
      "DOMAIN-SUFFIX,youtu.be,📹YouTube",
      "DOMAIN-SUFFIX,youtube-nocookie.com,📹YouTube",
      "DOMAIN-SUFFIX,ytimg.com,📹YouTube",
      "DOMAIN-SUFFIX,googlevideo.com,📹YouTube"
    ]
  },


  // ----------------------------------------------------------
  // 港澳台媒体
  // ----------------------------------------------------------

  {
    key: "media-hk",
    name: "🎬港澳台媒体",

    url: "https://viu.tv/",

    rules: [

      // Viu
      "DOMAIN-SUFFIX,viu.tv,🎬港澳台媒体",
      "DOMAIN-SUFFIX,viu.com,🎬港澳台媒体",

      // TVB
      "DOMAIN-SUFFIX,tvb.com,🎬港澳台媒体",
      "DOMAIN-SUFFIX,mytvsuper.com,🎬港澳台媒体",

      // Now TV
      "DOMAIN-SUFFIX,nowtv.com,🎬港澳台媒体",

      // 香港电台
      "DOMAIN-SUFFIX,rthk.hk,🎬港澳台媒体",

      // 香港有线
      "DOMAIN-SUFFIX,cabletv.com.hk,🎬港澳台媒体",

      // 台湾常见流媒体
      "DOMAIN-SUFFIX,linetv.tw,🎬港澳台媒体",
      "DOMAIN-SUFFIX,catchplay.com,🎬港澳台媒体"
    ]
  },


  // ----------------------------------------------------------
  // 哔哩哔哩国际版
  // ----------------------------------------------------------

  {
    key: "biliintl",
    name: "📺哔哩东南亚",

    url: "https://www.bilibili.tv/",

    rules: [
      "DOMAIN-SUFFIX,bilibili.tv,📺哔哩东南亚",
      "DOMAIN-SUFFIX,bilivideo.com,📺哔哩东南亚"
    ]
  },


  // ----------------------------------------------------------
  // 巴哈姆特
  // ----------------------------------------------------------

  {
    key: "bahamut",
    name: "🎮巴哈姆特",

    url: "https://ani.gamer.com.tw/ajax/getdeviceid.php",

    rules: [
      "DOMAIN-SUFFIX,gamer.com.tw,🎮巴哈姆特",
      "DOMAIN-SUFFIX,bahamut.com.tw,🎮巴哈姆特",
      "DOMAIN-SUFFIX,ani.gamer.com.tw,🎮巴哈姆特"
    ]
  },


  // ----------------------------------------------------------
  // Netflix
  // ----------------------------------------------------------

  {
    key: "netflix",
    name: "🎥Netflix",

    url: "https://api.fast.com/netflix/speedtest/v2?https=true",

    rules: [
      "DOMAIN-SUFFIX,netflix.com,🎥Netflix",
      "DOMAIN-SUFFIX,netflix.net,🎥Netflix",
      "DOMAIN-SUFFIX,nflxvideo.net,🎥Netflix",
      "DOMAIN-SUFFIX,nflximg.com,🎥Netflix",
      "DOMAIN-SUFFIX,nflximg.net,🎥Netflix",
      "DOMAIN-SUFFIX,nflxso.net,🎥Netflix"
    ]
  },


  // ----------------------------------------------------------
  // Disney+
  // ----------------------------------------------------------

  {
    key: "disney",
    name: "🏰Disney+",

    url: "https://disney.api.edge.bamgrid.com/devices",

    rules: [
      "DOMAIN-SUFFIX,disneyplus.com,🏰Disney+",
      "DOMAIN-SUFFIX,disney-plus.net,🏰Disney+",
      "DOMAIN-SUFFIX,bamgrid.com,🏰Disney+",
      "DOMAIN-SUFFIX,disney.com,🏰Disney+"
    ]
  },


  // ----------------------------------------------------------
  // TikTok
  // ----------------------------------------------------------

  {
    key: "tiktok",
    name: "🎵TikTok",

    url: "https://www.tiktok.com/",

    rules: [
      "DOMAIN-SUFFIX,tiktok.com,🎵TikTok",
      "DOMAIN-SUFFIX,tiktokcdn.com,🎵TikTok",
      "DOMAIN-SUFFIX,tiktokv.com,🎵TikTok",
      "DOMAIN-SUFFIX,ibytedtos.com,🎵TikTok",
      "DOMAIN-SUFFIX,musical.ly,🎵TikTok"
    ]
  },


  // ----------------------------------------------------------
  // Spotify
  // ----------------------------------------------------------

  {
    key: "spotify",
    name: "🎧Spotify",

    url: "https://spclient.wg.spotify.com/signup/public/v1/account",

    rules: [
      "DOMAIN-SUFFIX,spotify.com,🎧Spotify",
      "DOMAIN-SUFFIX,spotifycdn.com,🎧Spotify",
      "DOMAIN-SUFFIX,scdn.co,🎧Spotify"
    ]
  },


  // ----------------------------------------------------------
  // Pixiv
  // ----------------------------------------------------------

  {
    key: "pixiv",
    name: "🎨Pixiv",

    url: "https://www.pixiv.net/",

    rules: [
      "DOMAIN-SUFFIX,pixiv.net,🎨Pixiv",
      "DOMAIN-SUFFIX,pixiv.org,🎨Pixiv",
      "DOMAIN-SUFFIX,fanbox.cc,🎨Pixiv",
      "DOMAIN-SUFFIX,pximg.net,🎨Pixiv"
    ]
  },


  // ----------------------------------------------------------
  // HBO / Max
  // ----------------------------------------------------------

  {
    key: "hbo",
    name: "📽️HBO",

    url: "https://www.hbo.com/favicon.ico",

    rules: [
      "DOMAIN-SUFFIX,hbo.com,📽️HBO",
      "DOMAIN-SUFFIX,hbomax.com,📽️HBO",
      "DOMAIN-SUFFIX,max.com,📽️HBO"
    ]
  },


  // ----------------------------------------------------------
  // Prime Video
  // ----------------------------------------------------------

  {
    key: "primevideo",
    name: "📦Prime Video",

    url: "https://www.primevideo.com/",

    rules: [
      "DOMAIN-SUFFIX,primevideo.com,📦Prime Video",
      "DOMAIN-SUFFIX,amazonvideo.com,📦Prime Video",
      "DOMAIN-SUFFIX,aiv-cdn.net,📦Prime Video"
    ]
  },


  // ----------------------------------------------------------
  // Hulu
  // ----------------------------------------------------------

  {
    key: "hulu",
    name: "🟢Hulu",

    url: "https://www.hulu.com/",

    rules: [
      "DOMAIN-SUFFIX,hulu.com,🟢Hulu",
      "DOMAIN-SUFFIX,huluim.com,🟢Hulu"
    ]
  },


  // ----------------------------------------------------------
  // Telegram
  // ----------------------------------------------------------

  {
    key: "telegram",
    name: "✈️Telegram",

    url: "https://telegram.org/",

    rules: [
      "DOMAIN-SUFFIX,telegram.org,✈️Telegram",
      "DOMAIN-SUFFIX,telegram.me,✈️Telegram",
      "DOMAIN-SUFFIX,t.me,✈️Telegram",
      "DOMAIN-SUFFIX,telegra.ph,✈️Telegram"
    ]
  },


  // ----------------------------------------------------------
  // WhatsApp
  // ----------------------------------------------------------

  {
    key: "whatsapp",
    name: "💬WhatsApp",

    url: "https://web.whatsapp.com/data/manifest.json",

    rules: [
      "DOMAIN-SUFFIX,whatsapp.com,💬WhatsApp",
      "DOMAIN-SUFFIX,whatsapp.net,💬WhatsApp"
    ]
  },


  // ----------------------------------------------------------
  // LINE
  // ----------------------------------------------------------

  {
    key: "line",
    name: "💚Line",

    url: "https://line.me/page-data/app-data.json",

    rules: [
      "DOMAIN-SUFFIX,line.me,💚Line",
      "DOMAIN-SUFFIX,line-apps.com,💚Line",
      "DOMAIN-SUFFIX,lin.ee,💚Line"
    ]
  },


  // ----------------------------------------------------------
  // 游戏平台
  // ----------------------------------------------------------

  {
    key: "games",
    name: "🎮游戏平台",

    url: "https://store.steampowered.com/",

    rules: [

      // Steam
      "DOMAIN-SUFFIX,steampowered.com,🎮游戏平台",
      "DOMAIN-SUFFIX,steamcommunity.com,🎮游戏平台",
      "DOMAIN-SUFFIX,steamcontent.com,🎮游戏平台",
      "DOMAIN-SUFFIX,steamstatic.com,🎮游戏平台",

      // Epic
      "DOMAIN-SUFFIX,epicgames.com,🎮游戏平台",

      // EA
      "DOMAIN-SUFFIX,ea.com,🎮游戏平台",

      // Ubisoft
      "DOMAIN-SUFFIX,ubisoft.com,🎮游戏平台",

      // Rockstar
      "DOMAIN-SUFFIX,rockstargames.com,🎮游戏平台",

      // Battle.net
      "DOMAIN-SUFFIX,battle.net,🎮游戏平台",
      "DOMAIN-SUFFIX,blizzard.com,🎮游戏平台"
    ]
  },


  // ----------------------------------------------------------
  // Apple
  // ----------------------------------------------------------

  {
    key: "apple",
    name: "🍎苹果服务",

    url: "http://www.apple.com/library/test/success.html",

    rules: [
      "DOMAIN-SUFFIX,apple.com,🍎苹果服务",
      "DOMAIN-SUFFIX,apple-cloudkit.com,🍎苹果服务",
      "DOMAIN-SUFFIX,icloud.com,🍎苹果服务",
      "DOMAIN-SUFFIX,icloud.com.cn,🍎苹果服务",
      "DOMAIN-SUFFIX,mzstatic.com,🍎苹果服务",
      "DOMAIN-SUFFIX,cdn-apple.com,🍎苹果服务"
    ]
  },


  // ----------------------------------------------------------
  // Google
  // ----------------------------------------------------------

  {
    key: "google",
    name: "🔍Google",

    url: "http://www.google.com/generate_204",

    rules: [
      "DOMAIN-SUFFIX,google.com,🔍Google",
      "DOMAIN-SUFFIX,googleapis.com,🔍Google",
      "DOMAIN-SUFFIX,googleusercontent.com,🔍Google",
      "DOMAIN-SUFFIX,gstatic.com,🔍Google",
      "DOMAIN-SUFFIX,ggpht.com,🔍Google"
    ]
  },


  // ----------------------------------------------------------
  // GitHub
  // ----------------------------------------------------------

  {
    key: "github",
    name: "🐙Github",

    url: "https://github.com/robots.txt",

    rules: [
      "DOMAIN-SUFFIX,github.com,🐙Github",
      "DOMAIN-SUFFIX,githubusercontent.com,🐙Github",
      "DOMAIN-SUFFIX,githubassets.com,🐙Github",
      "DOMAIN-SUFFIX,github.io,🐙Github"
    ]
  },


  // ----------------------------------------------------------
  // Microsoft
  // ----------------------------------------------------------

  {
    key: "microsoft",
    name: "🪟微软服务",

    url: "http://www.msftconnecttest.com/connecttest.txt",

    rules: [
      "DOMAIN-SUFFIX,microsoft.com,🪟微软服务",
      "DOMAIN-SUFFIX,microsoftonline.com,🪟微软服务",
      "DOMAIN-SUFFIX,live.com,🪟微软服务",
      "DOMAIN-SUFFIX,office.com,🪟微软服务",
      "DOMAIN-SUFFIX,office.net,🪟微软服务",
      "DOMAIN-SUFFIX,windows.com,🪟微软服务",
      "DOMAIN-SUFFIX,windowsupdate.com,🪟微软服务",
      "DOMAIN-SUFFIX,xbox.com,🪟微软服务"
    ]
  }

];


// ============================================================
// 五、DNS
// ============================================================

const dnsConfig = {

  enable: true,

  // 默认 DNS
  "default-nameserver": [
    "223.5.5.5",
    "223.6.6.6"
  ],

  // 常规解析
  nameserver: [
    "https://dns.alidns.com/dns-query",
    "https://doh.pub/dns-query"
  ],

  // 代理节点自身解析
  "proxy-server-nameserver": [
    "https://dns.alidns.com/dns-query",
    "https://doh.pub/dns-query"
  ],

  // DIRECT 流量解析
  "direct-nameserver": [
    "https://dns.alidns.com/dns-query",
    "https://doh.pub/dns-query"
  ],

  // 根据规则判断 DNS
  "respect-rules": true
};


// ============================================================
// 六、主函数
// ============================================================

function main(params) {

  if (!params || typeof params !== "object") {
    return params;
  }

  // This project may expose nodes through proxy-providers instead of proxies.
  overwriteDNS(params);
  overwriteRules(params);
  overwriteProxyGroups(params);

  return params;
}


// ============================================================
// 七、DNS 覆写
// ============================================================

function overwriteDNS(params) {

  params.dns = dnsConfig;

}


// ============================================================
// 八、规则覆写
// ============================================================

function overwriteRules(params) {

  const rules = [

    // --------------------------------------------------------
    // 微信输入法
    // --------------------------------------------------------

    "PROCESS-NAME,wetype_installer.exe,DIRECT",
    "PROCESS-NAME,wetype_renderer.exe,DIRECT",
    "PROCESS-NAME,wetype_server.exe,DIRECT",
    "PROCESS-NAME,wetype_service.exe,DIRECT",
    "PROCESS-NAME,wetype_update.exe,DIRECT",


    // --------------------------------------------------------
    // 私有网络
    // --------------------------------------------------------

    "GEOSITE,private,DIRECT",
    "GEOIP,LAN,DIRECT",
    "IP-CIDR,10.0.0.0/8,DIRECT,no-resolve",
    "IP-CIDR,172.16.0.0/12,DIRECT,no-resolve",
    "IP-CIDR,192.168.0.0/16,DIRECT,no-resolve",
    "IP-CIDR,127.0.0.0/8,DIRECT,no-resolve",


    // --------------------------------------------------------
    // 特定国内直连
    // --------------------------------------------------------

    "DOMAIN-SUFFIX,bilibili.com,DIRECT",
    "DOMAIN-SUFFIX,hdslb.com,DIRECT",

    "DOMAIN-SUFFIX,new.sharedchat.cc,DIRECT",


    // --------------------------------------------------------
    // 特定代理
    // --------------------------------------------------------

    "DOMAIN-SUFFIX,tpqxb.com," + proxyName

  ];


  // ----------------------------------------------------------
  // 服务规则
  // ----------------------------------------------------------

  serviceConfigs.forEach(function (svc) {

    if (ruleOptions[svc.key]) {

      rules.push.apply(
        rules,
        svc.rules
      );

    }

  });


  // ----------------------------------------------------------
  // 中国大陆域名
  //
  // 注意：
  // 必须放在服务规则后面。
  //
  // 例如 Google / YouTube / OpenAI 等服务即使存在
  // 某些 CN 地址，也优先匹配自己的服务规则。
  // ----------------------------------------------------------

  rules.push(
    "GEOSITE,CN,DIRECT"
  );


  // ----------------------------------------------------------
  // 中国大陆 IP
  //
  // 不使用 no-resolve。
  // ----------------------------------------------------------

  rules.push(
    "GEOIP,CN,DIRECT"
  );


  // ----------------------------------------------------------
  // 最终规则
  // ----------------------------------------------------------

  rules.push(
    "MATCH," + proxyName
  );


  params.rules = rules;

  // The subscription rules are no longer referenced after full replacement.
  delete params["rule-providers"];
  delete params["sub-rules"];

}


// ============================================================
// 九、代理组覆写
// ============================================================

function overwriteProxyGroups(params) {

  // Keep the original groups long enough to reuse the project's actual
  // provider-country groups. They are built from fetched node names.
  const originalGroups = Array.isArray(params["proxy-groups"])
    ? params["proxy-groups"]
    : [];

  const allProxies = (Array.isArray(params.proxies) ? params.proxies : [])
    .map(function (proxy) {
      return proxy && proxy.name;
    })
    .filter(function (name) {
      return typeof name === "string" && name.length > 0;
    });

  const providerNames = Object.keys(params["proxy-providers"] || {});
  const hasProviders = providerNames.length > 0;
  const infoNodeRegex = /剩余|到期|过期|重置|流量|官网|订阅|套餐|expire|traffic|reset/i;
  const usableProxies = allProxies.filter(function (name) {
    return !infoNodeRegex.test(name);
  });

  function addNodeSource(group, inlineNames) {
    if (hasProviders) {
      // Keep the provider references explicit, matching this project's output.
      // This avoids relying on client-side provider discovery.
      group.use = providerNames.slice();
      group["exclude-filter"] = "(?i)(" + infoNodeRegex.source + ")";
      if (inlineNames.length > 0) {
        group.proxies = inlineNames.slice();
      }
    } else {
      group.proxies = inlineNames.length > 0 ? inlineNames.slice() : ["DIRECT"];
    }
    return group;
  }

  // ----------------------------------------------------------
  // 创建地区容器并分类内联节点
  // ----------------------------------------------------------

  const regionGroups = {};
  regionDefinitions.forEach(function (region) {
    regionGroups[region.name] = [];
  });

  usableProxies.forEach(function (nodeName) {
    for (let i = 0; i < regionDefinitions.length; i++) {
      const region = regionDefinitions[i];
      if (region.regex.test(nodeName)) {
        regionGroups[region.name].push(nodeName);
        return;
      }
    }
  });

  const sortedProxies = [];
  regionDefinitions.forEach(function (region) {
    if (regionGroups[region.name].length > 0) {
      sortedProxies.push.apply(sortedProxies, regionGroups[region.name]);
    }
  });

  usableProxies.forEach(function (nodeName) {
    if (sortedProxies.indexOf(nodeName) === -1) {
      sortedProxies.push(nodeName);
    }
  });

  // ----------------------------------------------------------
  // 地区组
  //
  // Provider 模式：复用项目根据真实 provider 节点生成的 url-test 组，
  // 因此不会凭空出现不存在的国家/地区。
  // 内联模式：只生成确实匹配到节点的地区组。
  // ----------------------------------------------------------

  const regionAutoGroupName = "🌍地区自动选择";
  let regionAutoGroups;

  if (hasProviders) {
    regionAutoGroups = originalGroups
      .filter(function (group) {
        return group &&
          group.type === "url-test" &&
          Array.isArray(group.use) &&
          group.use.length > 0 &&
          typeof group.filter === "string" &&
          group.filter.length > 0;
      })
      .map(function (group) {
        return Object.assign({}, group, {
          hidden: true,
          "exclude-filter": "(?i)(" + infoNodeRegex.source + ")"
        });
      });
  } else {
    regionAutoGroups = regionDefinitions
      .filter(function (region) {
        return regionGroups[region.name].length > 0;
      })
      .map(function (region) {
        return {
          name: region.name,
          type: "url-test",
          url: "http://www.gstatic.com/generate_204",
          interval: 300,
          tolerance: 50,
          lazy: true,
          hidden: true,
          proxies: regionGroups[region.name]
        };
      });
  }

  // ----------------------------------------------------------
  // 主代理选择、手动选择、自动选择
  // ----------------------------------------------------------

  const groups = [
    {
      name: proxyName,
      type: "select",
      proxies: [
        "🎯手动选择",
        "🤖自动选择",
        ...(regionAutoGroups.length > 0 ? [regionAutoGroupName] : []),
        "🔀负载均衡(散列)",
        "🔁负载均衡(轮询)",
        "DIRECT"
      ]
    },

    addNodeSource({
      name: "🎯手动选择",
      type: "select"
    }, sortedProxies),

    addNodeSource({
      name: "🤖自动选择",
      type: "url-test",
      url: "http://www.gstatic.com/generate_204",
      interval: 300,
      tolerance: 50,
      lazy: true
    }, sortedProxies)
  ];

  if (!Array.isArray(groups[1].proxies)) {
    groups[1].proxies = [];
  }
  if (groups[1].proxies.indexOf("DIRECT") === -1) {
    groups[1].proxies.push("DIRECT");
  }

  // ----------------------------------------------------------
  // 地区选择
  // ----------------------------------------------------------

  if (regionAutoGroups.length > 0) {
    groups.push({
      name: regionAutoGroupName,
      type: "select",
      proxies: regionAutoGroups.map(function (group) {
        return group.name;
      })
    });

    groups.push.apply(groups, regionAutoGroups);
  }

  // ----------------------------------------------------------
  // 负载均衡
  // ----------------------------------------------------------

  groups.push(addNodeSource({
    name: "🔀负载均衡(散列)",
    type: "load-balance",
    url: "http://www.gstatic.com/generate_204",
    interval: 300,
    "max-failed-times": 3,
    strategy: "consistent-hashing",
    lazy: true
  }, sortedProxies));

  groups.push(addNodeSource({
    name: "🔁负载均衡(轮询)",
    type: "load-balance",
    url: "http://www.gstatic.com/generate_204",
    interval: 300,
    "max-failed-times": 3,
    strategy: "round-robin",
    lazy: true
  }, sortedProxies));

  // ----------------------------------------------------------
  // 服务专用隐藏策略组
  // ----------------------------------------------------------

  serviceConfigs.forEach(function (svc) {
    if (!ruleOptions[svc.key]) {
      return;
    }

    const group = {
      name: svc.name,
      type: "select",
      proxies: [proxyName, "DIRECT"],
      hidden: true
    };

    if (svc.url) {
      group.url = svc.url;
    }

    groups.push(group);
  });

  params["proxy-groups"] = groups;

}