import React, {Component} from 'react';
import axios from 'axios';
import SatSetting from './SatSetting';
import SatelliteList from './SatelliteList';
import WorldMap from './WorldMap';
import {NEARBY_SATELLITE, SAT_API_KEY, STARLINK_CATEGORY} from "../constants";

class Main extends Component {
    constructor() {
        super();
        this.state = {
            satInfo: null,
            satList: null,
            settings: null,
            isLoadingList: false
        }

    }

    showNearbySatellite = (setting) => {
        // console.log("showNearbySatellite setting:", setting);
        this.setState({
            settings: setting
        })
        this.fetchSatellite(setting);
    }

    fetchSatellite = (setting) => {
        const {latitude, longitude, elevation, altitude} = setting;
        // console.log("fetchSAtellite setting:", setting);
        // const url = `/api/${NEARBY_SATELLITE}/${latitude}/${longitude}/${elevation}/${altitude}/${STARLINK_CATEGORY}/&apiKey=${SAT_API_KEY}`;

        this.setState({
            isLoadingList: true
        });
        // const curURL = `http://localhost:8080/jupiter/test/${NEARBY_SATELLITE}/${latitude}/${longitude}/${elevation}/${altitude}/${STARLINK_CATEGORY}/&apiKey=${SAT_API_KEY}`;
        // {
        //     NEARBY_SATELLITE: NEARBY_SATELLITE,
        //     latitude: latitude,
        //     longitude: longitude,altitude
        //     elevation: elevation,
        //         altitude: altitude,
        //     STARLINK_CATEGORY: STARLINK_CATEGORY,
        //     SAT_API_KEY: SAT_API_KEY
        // }


        // const curURL = `http://localhost:8080/jupiter/test`;
        const curURL = `http://3.135.218.13/jupiter/test`;
        console.log("curURL:", curURL);
        // this.ajax({
        //     method: 'GET',
        //     url: curURL,
        //     data: [],
        //     success: function(res) {
        //         if (res.status == 'OK') {
        //             console.log("res:", res);
        //             console.log("res.data:", res.data);
        //         } else {
        //             console.log("res status not ok");
        //         }
        //     },
        //     error: function() {
        //         throw new Error("An error occurred, can not fetch the satellite data");
        //     }
        // })

        axios.get(curURL,
            {params:
                    {
                        latitude:latitude,
                        longitude:longitude,
                        elevation: elevation,
                        altitude: altitude,
                        STARLINK_CATEGORY: STARLINK_CATEGORY,
                        SAT_API_KEY: SAT_API_KEY,
                        NEARBY_SATELLITE: NEARBY_SATELLITE
                    }
                }
            )
            .then(response => {
                console.log("new updated today~~~url get satellite data:", response.data)
                this.setState({
                    satInfo: response.data,
                    isLoadingList: false
                })
            })
            .catch(error => {
                console.log('err in fetch satellite -> ', error);
            })
    }

    showMap = selected => {
        // console.log("selected in showMap:", selected);
        // console.log("this.state before:", this.state);
        this.setState(preState => ({
            ...preState,
            satList: [...selected]
        }));
        // console.log("this pointer:", this);
        // console.log("this.state after:", this.state);
        // console.log("satList after:", this.state.satList);
    };

    ajax(opt) {
        var opt = opt || {},
            method = (opt.method || 'GET').toUpperCase(),
            url = opt.url,
            data = opt.data || null,
            success = opt.success || function () {
            },
            error = opt.error || function () {
            },
            // crossDomain: true,
            xhr = new XMLHttpRequest();

        if (!url) {
            throw new Error('missing url');
        }

        xhr.open(method, url, true);
        // xhr.withCredentials = true;
        // xhr.setRequestHeader("crossDomain", true)
        if (!data) {
            xhr.send();
        } else {
            xhr.setRequestHeader('Content-type', 'application/json;charset=utf-8');
            // xhr.setRequestHeader('Access-Control-Allow-Origin','http://localhost:3000');
            // xhr.setRequestHeader('Accept', 'application/json');

            xhr.send(JSON.stringify(data));
        }

        xhr.onload = function () {
            if (xhr.status === 200) {
                // success(JSON.parse(xhr.responseText))
                success(xhr.responseText)
            } else {
                error()
            }
        }

        xhr.onerror = function () {
            console.log("an error occurred in the xmlhttprequest");
            // throw new Error('The request could not be completed.')
        }
    }

    // render() {
    //     const {satInfo, satList, settings, isLoadingList} = this.state;
    //     return (
    //         <div className='main'>
    //             <div className="left-side">
    //                 <SatSetting onShow={this.showNearbySatellite}/>
    //                 <SatelliteList satInfo={satInfo}
    //                                onShowMap={this.showMap}
    //                                isLoad={isLoadingList}
    render() {
        const {isLoadingList, satInfo, satList, settings} = this.state;
        return (
            <div className="main">
                <div className="left-side">
                    <SatSetting onShow={this.showNearbySatellite}/>
                    <SatelliteList
                        isLoad={isLoadingList}
                        satInfo={satInfo}
                        onShowMap={this.showMap}
                    />
                </div>
                <div className="right-side">
                    <WorldMap satData={satList} observerData={settings}/>
                </div>
            </div>
        );
    }
}

export default Main;


