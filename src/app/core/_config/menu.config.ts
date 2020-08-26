export class MenuConfig {
	public defaults: any = {
		header: {
			self: {},
			items: [
				{
					title: "Dashboards",
					root: true,
					alignment: "left",
					page: "/dashboard",
					translate: "MENU.DASHBOARD",
				},
				{
					title: "Test",
					root: true,
					alignment: "left",
					page: "/test",
				},
				{
					title: "Users",
					root: true,
					alignment: "left",
					page: "/users",
				},
				{
					title: "User-Edit",
					root: true,
					alignment: "left",
					page: "/user-edit",
				},
				{
					title: "Teams",
					root: true,
					alignment: "left",
					page: "/teams",
				},
				{
					title: "Tasks",
					root: true,
					alignment: "left",
					page: "/tasks",
				},
				// {
				// 	title: 'Members',
				// 	root: true,
				// 	alignment: 'left',
				// 	page: '/members',
				// },
				{
					title: "Custom",
					root: true,
					alignment: "left",
					toggle: "click",
					submenu: [
						{
							title: "Wizard",
							bullet: "dot",
							icon: "flaticon2-mail-1",
							submenu: [
								{
									title: "Wizard 1",
									page: "/wizard/wizard-1",
								},
								{
									title: "Wizard 2",
									page: "/wizard/wizard-2",
								},
								{
									title: "Wizard 3",
									page: "/wizard/wizard-3",
								},
								{
									title: "Wizard 4",
									page: "/wizard/wizard-4",
								},
							],
						},
					],
				},
			],
		},
		aside: {
			self: {},
			items: [
				{
					title: "Dashboard",
					root: true,
					icon: "flaticon2-architecture-and-city",
					page: "/dashboard",
					translate: "MENU.DASHBOARD",
					bullet: "dot",
				},
				{ section: "Custom" },
				{
					title: "Wizard",
					root: true,
					bullet: "dot",
					icon: "flaticon2-mail-1",
					submenu: [
						{
							title: "Wizard 1",
							page: "/wizard/wizard-1",
						},
						{
							title: "Wizard 2",
							page: "/wizard/wizard-2",
						},
						{
							title: "Wizard 3",
							page: "/wizard/wizard-3",
						},
						{
							title: "Wizard 4",
							page: "/wizard/wizard-4",
						},
					],
				},
			],
		},
	};

	public get configs(): any {
		return this.defaults;
	}
}
