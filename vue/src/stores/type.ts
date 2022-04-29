export interface ChinaTotal {
	importedCase: number;
	noInfectH5: number;
	dead: number;
	nowConfirm: number;
	nowSevere: number;
	localConfirmH5: number;
	heal: number;
	noInfect: number;
	showLocalConfirm: number;
	showlocalinfeciton: number;
	local_acc_confirm: number;
	confirm: number;
	suspect: number;
	localConfirm: number;
}

export interface ChinaAdd {
	localConfirm: number;
	noInfectH5: number;
	localConfirmH5: number;
	confirm: number;
	heal: number;
	nowConfirm: number;
	importedCase: number;
	dead: number;
	suspect: number;
	nowSevere: number;
	noInfect: number;
}

export interface ShowAddSwitch {
	noInfect: boolean;
	confirm: boolean;
	suspect: boolean;
	dead: boolean;
	nowConfirm: boolean;
	nowSevere: boolean;
	importedCase: boolean;
	all: boolean;
	heal: boolean;
	localConfirm: boolean;
	localinfeciton: boolean;
}

export interface Today {
	confirm: number;
	isUpdated: boolean;
}

export interface Total {
	adcode: string;
	highRiskAreaNum: number;
	confirm: number;
	showRate: boolean;
	showHeal: boolean;
	wzz: number;
	provinceLocalConfirm: number;
	nowConfirm: number;
	continueDayZeroLocalConfirmAdd: number;
	continueDayZeroLocalConfirm: number;
	dead: number;
	heal: number;
	mediumRiskAreaNum: number;
	mtime: string;
}

export interface Total {
	nowConfirm: number;
	confirm: number;
	continueDayZeroLocalConfirmAdd: number;
	continueDayZeroLocalConfirm: number;
	mtime: string;
	dead: number;
	showRate: boolean;
	adcode: string;
	mediumRiskAreaNum: number;
	highRiskAreaNum: number;
	heal: number;
	showHeal: boolean;
	wzz: number;
	provinceLocalConfirm: number;
}

export interface Today {
	confirm: number;
	confirmCuts: number;
	isUpdated: boolean;
}

export interface Total {
	showRate: boolean;
	showHeal: boolean;
	adcode: string;
	mediumRiskAreaNum: number;
	mtime: string;
	nowConfirm: number;
	confirm: number;
	dead: number;
	heal: number;
	provinceLocalConfirm: number;
	wzz: number;
	highRiskAreaNum: number;
	continueDayZeroLocalConfirmAdd: number;
	continueDayZeroLocalConfirm: number;
}

export interface Children {
	today: Today;
	total: Total;
	name: string;
}

export interface Today {
	wzz_add: number;
	confirm: number;
	confirmCuts: number;
	isUpdated: boolean;
	tip: string;
}

export interface Children {
	total: Total;
	children: Children[];
	name: string;
	today: Today;
}

export interface AreaTree {
	name: string;
	today: Today;
	total: Total;
	children: Children[];
}

export interface Diseaseh5Shelf {
	lastUpdateTime: string;
	chinaTotal: ChinaTotal;
	chinaAdd: ChinaAdd;
	isShowAdd: boolean;
	showAddSwitch: ShowAddSwitch;
	areaTree: AreaTree[];
}

export interface StatisGradeCityDetail {
	city: string;
	confirmAdd: number;
	confirm: number;
	dead: number;
	grade: string;
	syear: number;
	province: string;
	nowConfirm: number;
	heal: number;
	date: string;
	mtime: string;
	sdate: string;
}

export interface Data {
	diseaseh5Shelf: Diseaseh5Shelf;
	statisGradeCityDetail: StatisGradeCityDetail[];
}

export interface Data {
	ret: number;
	info: string;
	data: Data;
}

export interface RootObject {
	data: Data;
}