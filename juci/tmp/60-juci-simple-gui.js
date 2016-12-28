
/*	
	This file is part of JUCI (https://github.com/mkschreder/juci.git)

	Copyright (c) 2015 Martin K. Schröder <mkschreder.uk@gmail.com>

	This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
*/ 

UCI.juci.$registerSectionType("simplegui", {
	"lan_network": 		{ dvalue: "lan", type: String }, 
	"wan_network": 		{ dvalue: "wan", type: String }, 
	"2g_radio": 		{ dvalue: "", type: String }, 
	"5g_radio": 		{ dvalue: "", type: String }
}); 
UCI.juci.$insertDefaults("simplegui"); 

/*	
	This file is part of JUCI (https://github.com/mkschreder/juci.git)

	Copyright (c) 2015 Martin K. Schröder <mkschreder.uk@gmail.com>

	This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
*/ 

JUCI.app
.controller("simple2GWirelessPage", function($scope, $uci, $config){
	$uci.$sync("wireless").done(function(){
		$scope.radio = $uci.wireless.r2g; 
		$scope.wifi_main = $uci.wireless.i2g; 
		$scope.wifi_guest = $uci.wireless.i2g_guest; 
		$scope.loaded = true; 
		$scope.$apply(); 
	}); 
}); 

/*	
	This file is part of JUCI (https://github.com/mkschreder/juci.git)

	Copyright (c) 2015 Martin K. Schröder <mkschreder.uk@gmail.com>

	This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
*/ 

JUCI.app
.controller("simple5GWirelessPage", function($scope, $uci){
	$uci.$sync("wireless").done(function(){
		$scope.radio = $uci.wireless.r5g; 
		$scope.wifi_main = $uci.wireless.i5g; 
		$scope.wifi_guest = $uci.wireless.i5g_guest; 
		$scope.loaded = true; 
		$scope.$apply(); 
	}); 
}); 

/*	
	This file is part of JUCI (https://github.com/mkschreder/juci.git)

	Copyright (c) 2015 Martin K. Schröder <mkschreder.uk@gmail.com>

	This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
*/ 

JUCI.app
.controller("simpleLANConfigPage", function($scope, $uci, $config){
	$uci.$sync("network").done(function(){
		$scope.lan = $uci.network[$config.settings.simplegui.lan_network.value]; 
		$scope.$apply(); 
	}); 
}); 

/*	
	This file is part of JUCI (https://github.com/mkschreder/juci.git)

	Copyright (c) 2015 Martin K. Schröder <mkschreder.uk@gmail.com>

	This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
*/ 

JUCI.app
.controller("simpleDhcpConfigPage", function($scope, $uci){
	$uci.$sync("network").done(function(){
		$scope.lan = $uci.network.lan; 
		$scope.$apply(); 
	}); 
}); 

/*	
	This file is part of JUCI (https://github.com/mkschreder/juci.git)

	Copyright (c) 2015 Martin K. Schröder <mkschreder.uk@gmail.com>

	This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
*/ 

JUCI.app
.controller("simpleWANConfigPage", function($scope, $uci, $tr, gettext){
	$scope.wan = {}; 
	$scope.loaded = false; 

	$uci.$sync("network").done(function(){
		$scope.wan = $uci.network.wan; 
		$scope.wan6 = $uci.network.wan6; 
		$scope.editor = "<network-connection-proto-"+$scope.wan.proto.value+"-edit ng-model='wan'/>"; 
		if($scope.wan6) $scope.editor6 = "<network-connection-proto-"+$scope.wan6.proto.value+"-edit ng-model='wan6'/>"; 
		$scope.loaded = true; 
		$scope.$apply(); 
	}); 
		
	$scope.protocolTypes = [
		{ label: $tr(gettext("Static Address")), value: "static" }, 
		{ label: $tr(gettext("DHCP v4")), value: "dhcp" }, 
		{ label: $tr(gettext("DHCP v6")), value: "dhcpv6" }, 
		{ label: $tr(gettext("PPP over Ethernet")), value: "pppoe" } 
	]; 
		
	$scope.protocolTypes6 = [
		{ label: $tr(gettext("Static Address")), value: "static" }, 
		{ label: $tr(gettext("DHCP v6")), value: "dhcpv6" }, 
	]; 

	$scope.$watch("wan.proto.value", function onFirewallWANProtoChanged(value){
		if(!$scope.wan.proto) return; 
		$scope.editor = "<network-connection-proto-"+$scope.wan.proto.value+"-edit ng-model='wan'/>"; 
	}); 

	$scope.$watch("wan6.proto.value", function onFirewallWAN6ProtoChanged(value){
		if(!value) return; 
		$scope.editor6 = "<network-connection-proto-"+value+"-edit ng-model='wan6'/>"; 
	}); 

}); 

//! Author: Reidar Cederqvist <reidar.cederqvist@gmail.com>

JUCI.app
.directive("simpleLanSettingsEdit", function(){
	return {
		templateUrl: "/widgets/simple-lan-settings-edit.html",
		scope: {
			model: "=ngModel"
		},
		replace: true,
		require: "^ngModel"
	};
});

angular.module('gettext').run(['gettextCatalog', function (gettextCatalog) {
	gettextCatalog.setStrings('en', {"Static Address":"Static Routes","DHCP v4":"","DHCP v6":"","PPP over Ethernet":"Internet","wireless.2g.info":"2.4GHz wireless configuration.","2.4GHz Wireless":"","Radio Configuration":"","SSID Configuration":"","wireless.5g.info":"Configure your 5GHz wireless hotspot.","5GHz Wireless":"","lan.config.info":"LAN Configuration","LAN Configuration":"","dhcp.config.info":"Here you can configure your dhcp settings","DHCP Configuration":"","wan.config.info":"WAN configuration","Configuration Method":"","Choose Configuration Option":"","WAN Configuration":"","simple-lan-config-title":"LAN","simple-services-title":"Services","simple-wan-config-title":"WAN","simple-lan-dhcp-config-title":"DHCP Server","simple-admin-title":"Admin","simple-5g-wireless-title":"5GHz Wireless","simple-2g-wireless-title":"2.4GHz Wireless","menu-simple-lan-config-title":"LAN","menu-simple-services-title":"Services","menu-simple-wan-config-title":"WAN","menu-simple-lan-dhcp-config-title":"DHCP Server","menu-simple-admin-title":"Admin","menu-simple-5g-wireless-title":"5GHz Wireless","menu-simple-2g-wireless-title":"2GHz Wireless"});
	gettextCatalog.setStrings('fi', {"Static Address":"","DHCP v4":"DHCP IPv4","DHCP v6":"DHCPv6","PPP over Ethernet":"","wireless.2g.info":" ","2.4Ghz Wireless":"Wifi","Radio Configuration":"Konfiguraatio","SSID Configuration":"Konfiguraatio","wireless.5g.info":" ","5Ghz Wireless":"Wifi","lan.config.info":"","LAN Configuration":"Konfiguraatio","dhcp.config.info":"","DHCP Configuration":"Konfiguraatio","wan.config.info":"","Configuration Method":"Konfiguraatiomenetelmä","Choose Configuration Option":"Valitse Konfiguraatiovaihtoehto","WAN Configuration":"Konfiguraatio","simple-lan-config-title":"Puheluloki","simple-wan-config-title":"Puheluloki","simple-lan-dhcp-config-title":"","simple-5g-wireless-title":"WiFi","simple-2g-wireless-title":"WiFi","menu-simple-lan-config-title":"Puheluloki","menu-simple-wan-config-title":"Puheluloki","menu-simple-lan-dhcp-config-title":"Puheluloki","menu-simple-5g-wireless-title":"WiFi","menu-simple-2g-wireless-title":"WiFi"});
	gettextCatalog.setStrings('sv-SE', {"Static Address":"Statisk IP-adress","DHCP v4":"DHCP server","DHCP v6":"DHCP server","PPP over Ethernet":"PPP över Ethernet","wireless.2g.info":"Här kan du konfigurera din 2Ghz trådlöst nätverk.  ","2.4Ghz Wireless":"2.4Ghz Wireless","Radio Configuration":"Radiokonfiguration","SSID Configuration":"SSID Konfiguration","wireless.5g.info":"Här kan du konfigurera ditt 5Ghz trådlöst nätverk. ","5Ghz Wireless":"5Ghz Trådlöst","lan.config.info":"Här kan du konfigurera ditt LAN nätverk. ","LAN Configuration":"LAN Konfiguration","dhcp.config.info":"DHCP konfiguration","DHCP Configuration":"DHCP Konfiguration","wan.config.info":"WAN konfiguration","Configuration Method":"Konfigurationsmetod","Choose Configuration Option":"Välj konfigurationsväg","WAN Configuration":"WAN konfiguration","simple-lan-config-title":"LAN","simple-services-title":"Tjänster","simple-wan-config-title":"WAN","simple-lan-dhcp-config-title":"DHCP","simple-admin-title":"Admin","simple-5g-wireless-title":"5Ghz WiFi","simple-2g-wireless-title":"2.4Ghz WiFi","menu-simple-lan-config-title":"LAN","menu-simple-services-title":"Tjänster","menu-simple-wan-config-title":"WAN","menu-simple-lan-dhcp-config-title":"DHCP","menu-simple-admin-title":"Admin","menu-simple-5g-wireless-title":"5Ghz WiFi","menu-simple-2g-wireless-title":"2.4Ghz WiFi"});
}]);

