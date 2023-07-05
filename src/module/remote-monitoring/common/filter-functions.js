import React, { Component } from "react";
import ContinentService from "../../../services/continent-service";
import CountryService from "../../../services/country-service";
import StateService from "../../../services/state-service";
import PlantService from "../../../services/plant-service";
import AssetService from "../../../services/asset-service";
import PageList from "../../../utils/page/page-list";
let url = window.location.href;
class FilterFunctions extends PageList {
  continentService = new ContinentService();
  countryService = new CountryService();
  stateService = new StateService();
  customerService = new PlantService();
  assetService = new AssetService();
  
  constructor(props) {
    super(props);
    this.getContinentList = this.getContinentList.bind(this);
    this.getCountryList = this.getCountryList.bind(this);
    this.getStateList = this.getStateList.bind(this);
    this.getCustomerList = this.getCustomerList.bind(this);
    this.getAssetList = this.getAssetList.bind(this);
    
  }
  getContinentList() {
    this.setState((state, props) => ({
      ...state,
      isContinentListLoading: true,
      continentList: [],
      countryList: [],
      stateList: [],
    }));
    this.continentService
      .list({ active: true })
      .then((response) => {
        this.setState((state, props) => ({
          ...state,
          continentList: response.data?.map((e) => ({
            label: e.continentName,
            value: e.continentId,
          })),
        }),()=>{
          this.props.form?.setFieldsValue({regionId:response.data[0].continentId,region:response.data[0].continentId})
          this.getCountryList(response.data[0].continentId)
        })
      })
      .finally(() => {
        this.setState((state, props) => ({
          ...state,
          isContinentListLoading: false,
        }));
      });
          
  }
  getCountryList(continentId) {
    this.setState((state, props) => ({
      ...state,
      isCountryListLoading: true,
      countryList: [],
      stateList: [],
    }));
    this.countryService
      .list({ active: true, continentId: continentId })
      .then((response) => {
        this.setState((state, props) => ({
          ...state,
          countryList: response.data?.map((e) => ({
            label: e.countryName,
            value: e.countryId,
          })),
        }),()=>{this.props.form?.setFieldsValue({countryId:response.data[0]?.countryId,country:response.data[0]?.countryId})  
          this.getStateList(response.data[0]?.countryId)  
        })
      })
      .finally(() => {
        this.setState((state, props) => ({
          ...state,
          isCountryListLoading: false,
        }));
      });
  }
  getStateList(countryId , url) {
    this.setState((state, props) => ({
      ...state,
      isStateListLoading: true,
      stateList: [],
    }));
    this.stateService
      .list({ active: true, countryId: countryId })
      .then((response) => {
        this.setState((state, props) => ({
          ...state,
          stateList: response.data?.map((e) => ({
            label: e.stateName,
            value: e.stateId,
          })),
        }),()=>{this.props.form?.setFieldsValue({stateId:response.data[0]?.stateId,state:response.data[0]?.stateId})
        this.getCustomerList(response.data[0]?.stateId)
        });
      })
      .finally(() => {
        this.setState((state, props) => ({
          ...state,
          isStateListLoading: false,
        }));
      });
  }
  getCustomerList(state) {
    this.setState((state, props) => ({
      ...state,
      isCustomerListLoading: true,
      customerList: [],
    }));
    this.customerService
      .list({ active: true, state: state })
      .then((response) => {
        this.setState((state, props) => ({
          ...state,
          customerList: response.data?.map((e) => ({
            label: e.customerName,
            value: e.customerId,
          })),
        })
        // ,()=>{this.props.form?.setFieldsValue({customer:response.data[0]?.customerId,plantId:response.data[0]?.customerId})
        // this.getAssetList(response.data[0]?.customerId)}
        );
      })
      .finally(() => {
        this.setState((state, props) => ({
          ...state,
          isCustomerListLoading: false,
        }));
      });
  }
  callbackAsset(data) {}
  getAssetList(plantId) {
    this.setState((state, props) => ({
      ...state,
      isAssetListLoading: true,
      assetList: [],
    }));
    this.assetService
      .list({ active: true, published: true, plantId: plantId })
      .then((response) => {
        this.setState((state, props) => ({
          ...state,
          assetList: response.data?.map((e) => ({
            label: e.assetName,
            value: e.assetId,
          })),
        })
        ,()=>{this.props.form?.setFieldsValue({assetId:response.data[0]?.assetId ,asset:response.data[0]?.assetId})}
        );
        this.callbackAsset(response.data);
      })
      .finally(() => {
        this.setState((state, props) => ({
          ...state,
          isAssetListLoading: false,
        }));
      });
  }
}

export default FilterFunctions;
