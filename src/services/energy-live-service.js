import HttpClient from "./http";
import { rootUrl } from "../helpers/url";
class EnergyLiveMonitoringService {
  http = new HttpClient();

  getTotal(filter = {}) {
    return this.http.get(`${rootUrl}/energy/energyMonitoring`, {
      params: filter,
    });
  }

  timeSeries(filter = {}) {
    return this.http.get(`${rootUrl}/remote-monitoring/timeseries`, {
      params: filter,
    });
  }

  getCumulativeEnergy(filter = {}) {
    return this.http.get(`${rootUrl}/energy/cumulative-energy-consumption`, {
      params: filter,
    });
  }

  list(filter = {}) {
    return this.http.get(`${rootUrl}/energy/dashboard`, {
      params: filter,
    });
  }
}
export default EnergyLiveMonitoringService;
