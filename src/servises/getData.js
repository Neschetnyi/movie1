class GetData {
  async getResources(url) {
    const res = await fetch(url);
    await res.then((value) => {
      console.log(value.json());
    });
    return await res.json();
  }

  getData() {
    return this.getResources();
  }
}

export default GetData;
