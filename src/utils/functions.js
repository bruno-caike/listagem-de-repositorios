import axios from 'axios';

export const SearchRepositories = async (search, page, sort) => {
    let data = [];
    await axios.get('https://api.github.com/search/repositories', {
        params: {
          q: search,
          sort: sort,
          page: page,
          order: 'desc',
          per_page: 40
        }
    }).then(function (response) {
        data = response.data;
    }).catch(function (error) {
        console.log(error);
    });
    return data;
}