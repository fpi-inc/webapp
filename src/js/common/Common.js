angular.module('fpiwebapp.common', [])
 
.factory('platformServer', function() {
  return platformServer;
})

.factory('MenuServer', function($rootScope) {
	var MenuServer = function(){
		this.cover = null;
		this.menuArray = [];
	};
	MenuServer.prototype = {
		init: function(){
			this.createMenu();
			this.createBgDom();
		},
		// remove: function(){
		// 	if (this.cover) {
		// 		this.cover.remove();
		// 		for(var i = 0; i < this.menuArray.length; i++){
		// 			this.menuArray[i].remove();
		// 		}
		// 	};
		// },
		createBgDom: function(){
			var self = this;
			this.cover = document.createElement('div');
			this.cover.setAttribute('class', 'coverCls');
			this.cover.style.height = jQuery(document).height() + 'px';
			$("body").append(this.cover);
			
			this.cover.addEventListener('click', function(){
				this.remove();
				self.removeMenuItem();
			});
		},
		removeCoverItem: function(){
			var self = this;
			self.cover.remove();
		},
		removeMenuItem: function(){
			var self = this;
			for(var i = 0; i < self.menuArray.length; i++){
				self.menuArray[i].remove();
			}

			$rootScope.isChoice = false;
		},
		createMenu: function(){
			var self = this;
			var pmenu = [];
			var menus = [{
				name: '首页',
				href: '#/',
				url: 'images/home.png'
			},{
				name: '超标统计',
				href: '#/exceed',
				url: 'images/m2.png'
			},{
				name: '传输有效率',
				href: '#/transport',
				url: 'images/m3.png'
			},{
				name: '我的关注',
				href: '#/personal',
				url: 'images/m4.png'
			}];
			for(var i = 0; i < menus.length; i++){
				var menuItem = document.createElement('div');
				menuItem.setAttribute('class', 'menuItemCls');
				menuItem.innerHTML = '<a href="'+ menus[i].href +'"><img src="'+ menus[i].url +'" width="32" height="32" border="0">' + menus[i].name + '</a>';
				menuItem.style.top = (20 + (i + 1) * 50) + 'px';
				$("body").append(menuItem);
				this.menuArray.push(menuItem);
				pmenu.push(menuItem);
				menuItem.addEventListener('click', function(){
					//this.remove();
					self.removeCoverItem();
					self.removeMenuItem();
				});
				(function(item){
					setTimeout(function(){
						$(pmenu[item]).animate({left: '20px'});
					}, ((item + 1) * 100));
				})(i);
			}
		}
	};
	return MenuServer;
});

