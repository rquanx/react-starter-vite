export const EnvType = {
	Local: 'Local',
	Develop: 'Develop',
	Product: 'Product',
	Test: "Test"
};

let env = EnvType.Develop;


export const Config = {
    APP: {
		Version: "0.0.1",
		Release: env === EnvType.Product
    },
    Api: {
        Base: env === EnvType.Develop ? "http://192.168.20.47:8011/" : "",
        File: {
            Path: "Api/File/",
            GetInvalidCorrelationFiles: "GetInvalidCorrelationFiles",
        },
    },
    Lists: {
        NewsList: "NewsList",
        NewsType: "NewsType",
        News: "News"
    },

    File: {
        Img: {
            Path: env === EnvType.Local ? "../assets/img" : "/recordmanagement/Style Library/Carsgen/img/"
        }
    },
    Pages: {
        Path: "",
        Size: 5, // 一页展示5条数据
        DisplayNum: 3, // 加载3页数据
        TimeSpan: 6
    },
    Site: {
        Path: location.protocol + '//' + location.host + location.pathname.split('/').slice(0, location.pathname.split('/').indexOf('Pages')).join('/')
    },
    Features: {
        Mock: false
    },
    Common: {}
};
export default Config;