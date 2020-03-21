class AxiosConfig {
  static url = (query) => {
    return `http://api.football-data.org/v2/${query}`;
  };

  static config = {
    headers: {
      'X-Auth-Token': 'c752765e6e3d45c0a4928f8b7c06e947'
    }
  };
}

export default AxiosConfig;
