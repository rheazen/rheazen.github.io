import { defineConfig } from 'vitepress-theme-async/config';

const githubSvg = '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M32 524.18q0 155.64 89.52 279.84t232.02 173.91q5.64 0.93 9.39 0.93t6.09-1.41 3.75-2.82 1.89-4.68 0.48-4.68v-94.23q-34.68 3.75-61.89-0.48t-42.66-13.14-27.18-22.02-15.93-23.91-8.43-22.5-5.16-13.59q-8.43-14.07-25.32-25.77t-25.32-18.75-1.89-13.59q46.89-24.39 105.93 61.89 31.89 47.82 111.57 28.14 9.39-38.43 37.5-65.64Q307.61 722 255.11 661.04t-52.5-148.14q0-81.57 51.57-141.57-20.64-60.93 5.64-128.43 27.18-1.89 60.93 10.77t47.34 21.57 23.91 16.41q53.43-15 120.48-15t121.41 15q12.18-8.43 27.18-17.82t45.93-20.16 57.18-8.91q25.32 66.57 6.57 126.57 52.5 60 52.5 141.57 0 87.18-53.43 148.59t-161.25 80.16q40.32 40.32 40.32 97.5v120.93q0 0.93 0.93 2.82 0 5.64 0.48 8.43t4.23 5.64 11.25 2.82q143.43-48.75 234.84-173.91t91.41-281.73q0-97.5-37.98-186.57t-102.18-153.27-153.27-102.18T512.03 44.15 325.46 82.13 172.19 184.31t-102.18 153.27-37.98 186.57z"></path></svg>'

export default defineConfig({
	srcDir: './',
	themeConfig: {
		rewritePost: true,
		topBars: [
			{ title: 'Home', url: '/' },
			{ title: 'About', url: '/about' },
		],
		page: {
      archives: "/archives/",
    },
		user: {
			name: '银耳的博客',
			firstName: "",
      lastName: "",
			email: "thomas.quan605@gmail.com",
			avatar: './logo.jpg',
			describe: '银耳的个人博客',
		},
		favicon: {
      // logo: "https://counter.imalun.com/www.imalun.com?theme=rule34",
      icon16: "/favicon-16x16.png",
      icon32: "/favicon-32x32.png",
      appleTouchIcon: "/apple-touch-icon.png",
      webmanifest: "/site.webmanifest",
      visibilitychange: false,
			showText: '银耳的博客',
			hideText: ''
    },
		banner: {
			type: "video",
			bgurl: "//cdn.moji.com/websrc/video/autumn20190924.mp4",
    },
		sidebar: {
			typedTextPrefix: "I`m",
      typedText: ["Web Developer"],
			social: [
				{
					name: 'github',
					url: 'https://github.com/rheazen',
					icon: githubSvg,
				},
			],
			info: [ 
				{ 
					key: '地址', 
					val: '湖南' 
				} 
			] 
		},
		rightside: {
			readmode: true,
			aside: true,
		},
		outline: {
			level: [2, 6],
		},
		cover: {
      default: "/images/logo/def_post_cover.png",
    },
		footer: { 
			powered: {
				enable: true
			},
			copyrightYear: '2025',
			liveTime: {
				enable: true,
				prefix: '本站已运行',
				startTime: '2025-07-16T02:18:00+08:00',
			}
		},
		postPagination: { 
			enable: true, 
			type: 'large' 
		},
		indexGenerator: {
			perPage: 8, 
		},
		search: {
      provider: "local",
    },
	},
});
