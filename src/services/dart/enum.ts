export enum Action {
	// TakePhoto = "TakePhoto",
	Back = "Back", // 返回
	Camera = "Camera", // 相机
	Open = "Open", // 新开页面
	File = "File", // 文件
	Reload = "Reload", // 刷新
	Phone = "Phone", // 拨打电话
	Cache = "Cache",
	// Channel.Action(Action.Route,{route: Route.,params:{ ... }});,跳转app页面
	Route = "Route"
}

export enum Route {
	Root = "/",
	Home = "/home",
	Draft = "/draft",
	Detail = "/detail",
	Filter = "/filter",
	Search = "/search",
	WebView = "/webView",
	Statistics = "/statistics",
	SearchResult = "/searchResult",
	PersonSelect = "/personSelect",
	OfflineDraft = "/offlineDraft",
	Painter = "/painter",
	Crop = "/crop",
	PreviewImage = "/previewImage",
	PickFile = "/pickFile",
	DeliveryDetaiList = "/deliveryDetaiList"
}

export enum CacheAction {
	// 验房进入详情的时候先执行，Channel.Action(Action.Cache,{action: CacheAction.getTaskDetail,data:taskID});
	// 如果返回为null,则调用验房缓存接口
	getTaskDetail = "getTaskDetail",

	// 保存问题的时候执行Channel.Action(Action.Cache,,{action: CacheAction.saveQuestion,data:question})
	// { DeliveryID,RepairID,RepairPart,RepairType,Description,Attachments,Status,UUID }
	saveQuestion = "saveQuestion",

	// 删除问题的时候执行 Channel.Action(Action.Cache,,{action: CacheAction.deleteQuestion,data:uuid})
	deleteQuestion = "deleteQuestion",

	// 点击验房完成的时候执行Channel.Action(Action.Cache,,{action: CacheAction.saveTaskDetail,data:{taskID,json,isComplete}})
	saveTaskDetail = "saveTaskDetail",

	// 拒收接口调用完后执行Channel.Action(Action.Cache,,{action: CacheAction.reject,data:taskID}})
	reject = "reject",

	startProcessing = "startProcessing" // 签约，收款开始办理，传入taskID和stepID
}

export enum ActionMsg {
	Refresh = "Refresh"
}