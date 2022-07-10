function game(){
    //创建元素
    var moveObj =function(){
        this.x = 0;				//坐标
        this.y = 0;
        this.color = '';		//颜色
        this.move = 0;			//移动范围
        this.area = [];			//移动格子
        this.name = '';			//名称
        this.LR = '';			//所属阵营 0 || 1
        this.num = 0;			//L:1~8 R:-1~-8
        this.jumpWater = false;	//是否可以跳过水塘
        this.index = 0; 		//在数组中的位置索引
    };
    var go = 2;//双数 黄方先 单数 红方后
    var getHistory = new Array();
    var getObj = { //获取阵营中的动物 用于改变动物坐标
        LR:0,
        num:0,
    };
    var objLR = [];//斗兽棋元素
    var gameLR = []; //斗兽棋对象【显示】
    //斗兽棋对象数据
    // 规则
    //			8			7			6			5			4			3			2		1
    // 自强至弱：象、		狮、		虎、		豹、		狼、		狗、		猫、	   鼠		   	✔
    // 强吃弱，老鼠吃大象；强弱相同，同归于尽【先手吃】																✔
    // 老虎和狮子可以在没有老鼠挡住的时候跳过河																   		✔
    // 老鼠可以游过河；其他动物只能在陆地上一次行走一格																✔
    // 不可以走进己方兽穴																						✔
    // 在敌方陷阱时可以被敌方任意棋子吃掉																		✔
    // 轮流下棋，黄方先手，进入敌方兽穴时判断为胜利																✔
    //兽穴坐标
    var homes = [
                {
                    x:1,
                    y:4,
                    LR:0,
                    color:'lightgreen',
                },
                {
                    x:9,
                    y:4,
                    LR:1,
                    color:'lightgreen',
                },
            ];
    //陷阱坐标
    var traps = [
                {
                    x:1,
                    y:3,
                    LR:0,
                    color:'red',
                },
                {
                    x:2,
                    y:4,
                    LR:0,
                    color:'red',
                },
                {
                    x:1,
                    y:5,
                    LR:0,
                    color:'red',
                },
                {
                    x:9,
                    y:3,
                    LR:1,
                    color:'yellow',
                },
                {
                    x:8,
                    y:4,
                    LR:1,
                    color:'yellow',
                },
                {
                    x:9,
                    y:5,
                    LR:1,
                    color:'yellow',
                },
            ];
    //水塘坐标
    var dataWater = [
                {
                    x:3,
                    y:2,
                    index:0,
                },
                {
                    x:4,
                    y:2,
                    index:1,
                },
                {
                    x:5,
                    y:2,
                    index:2,
                },
                {
                    x:3,
                    y:3,
                    index:3,
                },
                {
                    x:4,
                    y:3,
                    index:4,
                },
                {
                    x:5,
                    y:3,
                    index:5,
                },
                {
                    x:3,
                    y:5,
                    index:6,
                },
                {
                    x:4,
                    y:5,
                    index:7,
                },
                {
                    x:5,
                    y:5,
                    index:8,
                },
                {
                    x:3,
                    y:6,
                    index:9,
                },
                {
                    x:4,
                    y:6,
                    index:10,
                },
                {
                    x:5,
                    y:6,
                    index:11,
                },
            ];
    //跳跃~起点坐标 终点坐标
    var jumpPoint = [
                {
                    from:{x:3,y:2},
                    to:{x:7,y:2}
                },
                {
                    from:{x:3,y:3},
                    to:{x:7,y:3}
                },
                {
                    from:{x:3,y:5},
                    to:{x:7,y:5}
                },
                {
                    from:{x:3,y:6},
                    to:{x:7,y:6}
                },
                {
                    from:{x:7,y:2},
                    to:{x:3,y:2}
                },
                {
                    from:{x:7,y:3},
                    to:{x:3,y:3}
                },
                {
                    from:{x:7,y:5},
                    to:{x:3,y:5}
                },
                {
                    from:{x:7,y:6},
                    to:{x:3,y:6}
                },
                {
                    from:{x:4,y:1},
                    to:{x:4,y:4}
                },
                {
                    from:{x:5,y:1},
                    to:{x:5,y:4}
                },
                {
                    from:{x:6,y:1},
                    to:{x:6,y:4}
                },
                {
                    from:{x:4,y:7},
                    to:{x:4,y:4}
                },
                {
                    from:{x:5,y:7},
                    to:{x:5,y:4}
                },
                {
                    from:{x:6,y:7},
                    to:{x:6,y:4}
                },
                {
                    from:{x:4,y:4},
                    to:{x:4,y:[1,7]}
                },
                {
                    from:{x:5,y:4},
                    to:{x:5,y:[1,7]}
                },
                {
                    from:{x:6,y:4},
                    to:{x:6,y:[1,7]}
                },
            ];

    var dataLR = [
                {
                    x:1,
                    y:1,
                    color:'skyblue',
                    textColor:'yellow',
                    move:1,
                    area:[],
                    LR:0,
                    name:'虎',
                    num:6,				//虎
                    jumpWater:true,
                    index:0,
                    alive:true,
                    imageSrc:'./images/animals/left/6TigerLeft.png',
                    Name:'Tiger',
                },
                {
                    x:3,
                    y:1,
                    color:'skyblue',
                    textColor:'yellow',
                    move:1,
                    area:[],
                    LR:0,
                    name:'象',
                    num:8,				//象
                    jumpWater:false,
                    index:1,
                    alive:true,
                    imageSrc:'./images/animals/left/8ElephantLeft.png',
                    Name:'Elephant',
                },
                {
                    x:2,
                    y:2,
                    color:'skyblue',
                    textColor:'yellow',
                    move:1,
                    area:[],
                    LR:0,
                    name:'狗',
                    num:3,				//狗
                    jumpWater:false,
                    index:2,
                    alive:true,
                    imageSrc:'./images/animals/left/4DogLeft.png',
                    Name:'Dog',
                },
                {
                    x:3,
                    y:3,
                    color:'skyblue',
                    textColor:'yellow',
                    move:1,
                    area:[],
                    LR:0,
                    name:'狼',
                    num:4,				//狼
                    jumpWater:false,
                    index:3,
                    alive:true,
                    imageSrc:'./images/animals/left/3WolfLeft.png',
                    Name:'Wolf',
                },
                {
                    x:3,
                    y:5,
                    color:'skyblue',
                    textColor:'yellow',
                    move:1,
                    area:[],
                    LR:0,
                    name:'豹',
                    num:5,				//豹
                    jumpWater:false,
                    index:4,
                    alive:true,
                    imageSrc:'./images/animals/left/5LeopardLeft.png',
                    Name:'Leopard',
                },
                {
                    x:2,
                    y:6,
                    color:'skyblue',
                    textColor:'yellow',
                    move:1,
                    area:[],
                    LR:0,
                    name:'猫',
                    num:2,				//猫
                    jumpWater:false,
                    index:5,
                    alive:true,
                    imageSrc:'./images/animals/left/2CatLeft.png',
                    Name:'Cat',
                },
                {
                    x:1,
                    y:7,
                    color:'skyblue',
                    textColor:'yellow',
                    move:1,
                    area:[],
                    LR:0,
                    name:'狮',
                    num:7,				//狮
                    jumpWater:true,
                    index:6,
                    alive:true,
                    imageSrc:'./images/animals/left/7LionLeft.png',
                    Name:'Lion',
                },
                {
                    x:3,
                    y:7,
                    color:'skyblue',
                    textColor:'yellow',
                    move:1,
                    area:[],
                    LR:0,
                    name:'鼠',
                    num:1,				//鼠
                    jumpWater:false,
                    index:7,
                    alive:true,
                    imageSrc:'./images/animals/left/1MouseLeft.png',
                    Name:'Mouse',
                },
                {
                    x:9,
                    y:7,
                    color:'skyblue',
                    textColor:'red',
                    move:1,
                    area:[],
                    LR:1,
                    name:'虎',
                    num:6,				//虎
                    jumpWater:true,
                    index:8,
                    alive:true,
                    imageSrc:'./images/animals/right/6TigerRight.png',
                    Name:'Tiger',
                },
                {
                    x:7,
                    y:7,
                    color:'skyblue',
                    textColor:'red',
                    move:1,
                    area:[],
                    LR:1,
                    name:'象',
                    num:8,				//象
                    jumpWater:false,
                    index:9,
                    alive:true,
                    imageSrc:'./images/animals/right/8ElephantRight.png',
                    Name:'Elephant',
                },
                {
                    x:8,
                    y:6,
                    color:'skyblue',
                    textColor:'red',
                    move:1,
                    area:[],
                    LR:1,
                    name:'狗',
                    num:3,				//狗
                    jumpWater:false,
                    index:10,
                    alive:true,
                    imageSrc:'./images/animals/right/4DogRight.png',
                    Name:'Dog',
                },
                {
                    x:7,
                    y:5,
                    color:'skyblue',
                    textColor:'red',
                    move:1,
                    area:[],
                    LR:1,
                    name:'狼',
                    num:4,				//狼
                    jumpWater:false,
                    index:11,
                    alive:true,
                    imageSrc:'./images/animals/right/3WolfRight.png',
                    Name:'Wolf',
                },
                {
                    x:7,
                    y:3,
                    color:'skyblue',
                    textColor:'red',
                    move:1,
                    area:[],
                    LR:1,
                    name:'豹',
                    num:5,				//豹
                    jumpWater:false,
                    index:12,
                    alive:true,
                    imageSrc:'./images/animals/right/5LeopardRight.png',
                    Name:'Leopard',
                },
                {
                    x:8,
                    y:2,
                    color:'skyblue',
                    textColor:'red',
                    move:1,
                    area:[],
                    LR:1,
                    name:'猫',
                    num:2,				//猫
                    jumpWater:false,
                    index:13,
                    alive:true,
                    imageSrc:'./images/animals/right/2CatRight.png',
                    Name:'Cat',
                },
                {
                    x:9,
                    y:1,
                    color:'skyblue',
                    textColor:'red',
                    move:1,
                    area:[],
                    LR:1,
                    name:'狮',
                    num:7,				//狮
                    jumpWater:true,
                    index:14,
                    alive:true,
                    imageSrc:'./images/animals/right/7LionRight.png',
                    Name:'Lion',
                },
                {
                    x:7,
                    y:1,
                    color:'skyblue',
                    textColor:'red',
                    move:1,
                    area:[],
                    LR:1,
                    name:'鼠',
                    num:1,				//鼠
                    jumpWater:false,
                    index:15,
                    alive:true,
                    imageSrc:'./images/animals/right/1MouseRight.png',
                    Name:'Mouse',
                },
            ];
    //创建斗兽棋元素
    dataLR.forEach(function(lr,i){
        objLR[i] = new moveObj();
        objLR[i].x = lr.x;
        objLR[i].y = lr.y;
        objLR[i].color = lr.color;
        objLR[i].textColor = lr.textColor;
        objLR[i].move = lr.move;
        objLR[i].LR = lr.LR;
        objLR[i].name = lr.name;
        objLR[i].Name = lr.Name;//英文名
        objLR[i].num = lr.num;
        objLR[i].jumpWater = lr.jumpWater;
        objLR[i].index = lr.index;
        objLR[i].alive = lr.alive;
        objLR[i].imageSrc = lr.imageSrc;
    });

    //创建棋盘网格
    var wS = 32*5;
    var hS = 32*4;
    var wLength = 11,hLength = 9;
    wS = window.innerWidth / (wLength-2);
    hS = window.innerHeight / (hLength-2);
    var visualWorld = createDiv(0,0,(wLength-2)*wS,(hLength-2)*hS,document.body);								//可视区域
    position(visualWorld,window.innerWidth/2-visualWorld.offsetWidth/2,window.innerHeight/2-visualWorld.offsetHeight/2);
    setBgImage(visualWorld,'./images/map.png');
    var obj = createDiv(0,0,wLength*wS,hLength*hS,visualWorld);
    position(obj,visualWorld.offsetWidth/2-obj.offsetWidth/2,visualWorld.offsetHeight/2-obj.offsetHeight/2);					//世界范围
    setColor(obj);
    var tileds = [];
    for (var i = 0; i < wLength; i++) {//行
        tileds.push([]);
        for (var j = 0; j < hLength; j++) {//列
            tileds[i].push(createDiv(
                               i*wS,
                               j*hS,
                               wS,hS,obj));
            //border(tileds[i][j],'1px solid gray');
            //setText(tileds[i][j],{color:'red',text:i+',' + j,fontSize:hS/2});
            tileds[i][j].i = i;
            tileds[i][j].j = j;
            tileds[i][j].onclick = function(){
                go++;
                var unlock = true;
                if(this.style.backgroundColor=='lightgreen'){
                    var that = this;
                    var eatable = false;
                    var eatIndex = 0;
                    var swim = false;
                    var result = 0;				//-1败北 1胜利
                    var points = [
                                {x:4,y:1},
                                {x:5,y:1},
                                {x:6,y:1},
                                {x:4,y:4},
                                {x:5,y:4},
                                {x:6,y:4},
                                {x:4,y:7},
                                {x:5,y:7},
                                {x:6,y:7},
                                {x:3,y:2},
                                {x:3,y:3},
                                {x:7,y:2},
                                {x:7,y:3},
                                {x:3,y:5},
                                {x:3,y:6},
                                {x:7,y:5},
                                {x:7,y:6},
                            ];
                    //检测是否与水塘重合
                    dataWater.forEach(function(water){
                        if(water.x+1==that.i&&water.y==that.j){
                            swim = true;
                            if(getObj.name!=='鼠'){
                                unlock = false;
                            }
                        }
                    });
                    points.forEach(function(p){
                        if(p.x==that.i&&p.y==that.j){
                            dataWater.forEach(function(water){
                                if(water.x+1==getObj.x&&water.y==getObj.y){//河道里的老鼠要上岸
                                    var overlap = 1;
                                    objLR.forEach(function(LR){
                                        if(LR.x==that.i&&LR.y==that.j){//与棋子重合
                                            console.log('重合');
                                            overlap *= -1;
                                            //unlock = false;
                                        }else{							//不与棋子重合的情况下才可以上岸
                                            //unlock = true;
                                            overlap *= 1;
                                            console.log('不重合');
                                        }
                                    });
                                    console.log(overlap);
                                    if(overlap==-1){//岸上有动物【重合】老鼠不可上岸 岸上是大象【会被吃掉】
                                        unlock = false;
                                    }
                                }
                            });
                        }
                    });
                    //检测是否与兽穴重合	动物不可进入同阵营兽穴
                    homes.forEach(function(home){
                        if(home.x==that.i&&home.y==that.j){
                            if(home.LR==getObj.LR){
                                unlock = false;
                            }else{
                                if(getObj.LR==0){
                                    result = 1;
                                }else{
                                    result = -1;
                                }
                            }
                        }
                    });
                    //检测是否与棋子重合
                    objLR.forEach(function(LR){
                        if(LR.x==that.i&&LR.y==that.j){					//与棋子重合
                            if(getObj.num<LR.num||getObj.LR==LR.LR){//棋子小于目标、同阵营棋子
                                eatable = false;
                                unlock = false;
                                if(getObj.name=='鼠'&&LR.name=='象'&&getObj.LR!==LR.LR){//这里要再判断老鼠是否在河道【却决于要不要让河道的老鼠吃大象】不加条件就可以吃掉岸上的大象
                                    eatable = true;
                                    eatIndex = LR.index;
                                    unlock = true;
                                }
                            }else{
                                //吃子
                                eatable = true;
                                eatIndex = LR.index;
                                if(getObj.name=='象'&&LR.name=='鼠'){
                                    eatable = false;
                                    unlock = false;
                                }
                                dataWater.forEach(function(water){
                                    if(water.x+1==that.i&&water.y==that.j){
                                        if(LR.name=='鼠'){
                                            //console.log('水上鼠');//水上老鼠不可被吃
                                            eatable = false;
                                        }
                                    }
                                });
                            }
                            traps.forEach(function(trap){
                                if(trap.x==that.i&&trap.y==that.j){		//与陷阱重合
                                    if(trap.LR!==LR.LR){
                                        eatable = true;
                                        eatIndex = LR.index;
                                        unlock = true;
                                    }
                                }
                            });
                            if(!LR.alive){//确保死去的不会成为路障
                                unlock = true;
                            }
                        }
                    });
                    //虎狮过河如果路上有老鼠则不可通过
                    //////////////////////////////////判断老鼠是否在选棋与ij的范围 再判断阵营  鼠 index 7、15  老虎3，3 到7，3  老鼠是否在中间即 横向 3--7
                    objLR.forEach(function(obj){
                        if(obj.name=='鼠'){
                            if(getObj.y==that.j&&getObj.y==obj.y){
                                if(getObj.x < obj.x && obj.x < that.i || getObj.x > obj.x && obj.x > that.i){//老虎从左跳右||从右跳左
                                    unlock = false;
                                }
                            }
                            if(getObj.x==that.i&&getObj.x==obj.x){
                                if(getObj.y < obj.y && obj.y < that.j || getObj.y > obj.y && obj.y > that.j){//老虎从上跳下||从下跳上
                                    unlock = false;
                                }
                            }
                            if(unlock==false){
                                dataWater.forEach(function(water){
                                    if(water.x+1==obj.x&&water.y==obj.y){//老鼠在河道
                                        if(getObj.LR==obj.LR){//同阵营跳过河道
                                            if(getObj.name=='狮'||getObj.name=='虎'){//限定为同阵营的狮虎
                                                unlock = true;
                                            }
                                        }
                                    }
                                });
                            }
                        }
                    });
                    //移动
                    if(unlock){
                        var currentAnimal = getItem(objLR,{LR:'LR',num:'num'},{LR:getObj.LR,num:getObj.num});
                        currentAnimal.x = this.i;
                        currentAnimal.y = this.j;
                        position(gameLR[currentAnimal.index],currentAnimal.x*wS,currentAnimal.y*hS);
                        if(swim){
                            gameLR[currentAnimal.index].style.zIndex = 3;
                        }else{
                            gameLR[currentAnimal.index].style.zIndex = 1;
                        }
                        reSetGrids();//初始化棋盘
                        //能够移动才能吃子
                        if(eatable){
                            objLR[eatIndex].alive = false;
                            position(gameLR[eatIndex],visualWorld.offsetLeft,visualWorld.offsetHeight);//改变位置  移除有bug
                            gameLR[eatIndex].style.zIndex = -1;
                        }
                    }else{
                        go--;//不能走棋的情况下减一
                    }
                    //console.log(result);//正胜负败
                    if(result!==0){
                        //游戏结束
                        var overMenu = createDiv(0,0,visualWorld.offsetWidth,visualWorld.offsetHeight,visualWorld);
                        var overButton = createDiv(0,0,2*wS,1*hS,overMenu);
                        if(result>0){
                            setBgImage(overButton,'./images/win.png');
                        }else{
                            setBgImage(overButton,'./images/lose.png');
                        }
                        alignInDisplay(overButton,overMenu,'center');
                        overButton.onclick = function(){
                            this.parentNode.parentNode.removeChild(this.parentNode);
                        }
                    }
                }
            }
        }
    }
    //创建兽穴
    var homes_ = [];
    homes.forEach(function(home,i){
        homes_[i] = createDiv(home.x*wS,home.y*hS,wS,hS,obj);
        //setColor(homes_[i],home.color);
    });
    //创建陷阱
    var traps_ = [];
    traps.forEach(function(trap,i){
        traps_[i] = createDiv(trap.x*wS,trap.y*hS,wS,hS,obj);
        //setColor(traps_[i],trap.color);
    });
    //创建斗兽棋对象
    objLR.forEach(function(LR,i){
        gameLR[i] = createDiv(LR.x*wS,LR.y*hS,wS,hS,obj);
        gameLR[i].LR = LR.LR;
        gameLR[i].index = LR.index;
        //setText(gameLR[i],{text:LR.name,color:LR.textColor,align:'center',height:hS});
        gameLR[i].onclick = function(){
            getHistory[getHistory.length] = LR;
            console.log(getHistory);
            if(getHistory.length>1){
                if(getHistory[getHistory.length-1].LR==getHistory[getHistory.length-2].LR&&getHistory[getHistory.length-1].name==getHistory[getHistory.length-2].name){
                    console.log('重复选中棋子');
                    reSetGrids();//初始化棋盘
                    getHistory = new Array();
                    return false;
                }
            }
            /* 			if(this.style.color=='yellow'&&go%2==1||this.style.color=='red'&&go%2==0){//黄方先红方后
                return false;
            } */
            if(this.LR==0&&go%2==1||this.LR==1&&go%2==0){//黄方先红方后
                return false;
            }
            createAudio('./audio/' + LR.Name + '.mp3',false,1,true);
            getArea(LR,tileds);
            //getObj.LR = LR.LR;
            //getObj.num = LR.num;
            getObj = LR;
        }
        //setColor(gameLR[i],LR.color);
        setBgImage(gameLR[i],LR.imageSrc);
    });

    var w = [];
    dataWater.forEach(function(water,i){
        w[i] = createDiv((water.x+1)*wS,water.y*hS,wS,hS,obj);
        w[i].index = water.index;
        w[i].style.zIndex = 2;
        //setColor(w[i],'blue');
    });


    function getArea(moveObj,tileds){//单突出区域整合
        //点选对象后生成移动范围区域
        reSetGrids();//初始化棋盘
        for (var i = 0; i < moveObj.move+1; i++) {
            for (var j = moveObj.x-moveObj.move+i; j < moveObj.x+moveObj.move+1-i; j++) {
                for (var k = moveObj.y-moveObj.move; k < moveObj.y+moveObj.move+1-i; k++) {
                    setColor(tileds[j][moveObj.y+i],'lightgreen');
                    setColor(tileds[j][moveObj.y-i],'lightgreen');
                    tileds[j][moveObj.y+i].style.zIndex = 4;
                    tileds[j][moveObj.y-i].style.zIndex = 4;
                    tileds[j][moveObj.y+i].style.opacity = 0.5;
                    tileds[j][moveObj.y-i].style.opacity = 0.5;
                    setColor(tileds[moveObj.x][moveObj.y],'');
                    tileds[moveObj.x][moveObj.y].style.zIndex = 0;

                }
            }
        }
        if(moveObj.name=='虎'||moveObj.name=='狮'){
            jumpPoint.forEach(function(position){
                if(moveObj.x==position.from.x&&moveObj.y==position.from.y){
                    if(position.to.y.length==2){
                        position.to.y.forEach(function(y){
                            setColor(tileds[position.to.x][y],'lightgreen');
                            tileds[position.to.x][y].style.zIndex = 4;
                            tileds[position.to.x][y].style.opacity = 0.5;
                        });
                    }else{
                        setColor(tileds[position.to.x][position.to.y],'lightgreen');
                        tileds[position.to.x][position.to.y].style.zIndex = 4;
                        tileds[position.to.x][position.to.y].style.opacity = 0.5;
                    }
                }
            });
        }
        tileds.forEach(function(行){
            行.forEach(function(列){
                if(列.style.backgroundColor=='gray'){
                    moveObj.area.push({
                                          x:列.i,
                                          y:列.j
                                      });
                }
            });
        });
    }
    function reSetGrids(){//初始化棋盘
        tileds.forEach(function(行){//初始化棋盘格子
            行.forEach(function(列){
                列.style.backgroundColor = '';
                列.style.zIndex = 0;
                列.style.opacity = 1;
            });
        });
    }
    //开始游戏
    var beginMenu = createDiv(0,0,visualWorld.offsetWidth,visualWorld.offsetHeight,visualWorld);
    var beginButton = createDiv(0,0,2*wS,1*hS,beginMenu);
    setBgImage(beginButton,'./images/begin.png');
    alignInDisplay(beginButton,beginMenu,'center');
    beginButton.onclick = function(){
        this.parentNode.parentNode.removeChild(this.parentNode);
        createAudio('./audio/start.mp3',false,1,true);
        createAudio('./audio/bgm.mp3',true,1,true);
    }

}
