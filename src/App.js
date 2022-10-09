import { useRef, useState } from 'react';
import toastr from 'toastr';

import { SearchRepositories } from './utils/functions';

import './App.css';
import 'toastr/build/toastr.css';
import { Card } from './components/Card';

toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": true,
  "positionClass": "toast-top-right",
  "preventDuplicates": true,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "3000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const refSearch = useRef(null);
  const refPrevious = useRef(null);
  const refNext = useRef(null);

  const submitFormSearch = async (e) => {
    e.preventDefault();
    const inputSearch = refSearch.current.value;
    if (inputSearch.length >= 3) {
      const result = await SearchRepositories(inputSearch, page, "updated");
      setSearch(inputSearch);
      setData(result.items);
      setTotalPages(Math.ceil(result.total_count / 40));
      setPage(page + 1);
      toastr.success("Busca efetuada com sucesso");
    } else {
      toastr.error("Digite no mínimo 3 sílabas!");
    }
  }

  const handlePagination = async (next) => {
    const verifyPagination = next ? (page - 1 <= totalPages ? true : false) : (page - 1 > 0 ? true : false);
    if (verifyPagination) {
      const result = await SearchRepositories(search, page, "updated");
      setData(result.items);
      setTotalPages(Math.ceil(result.total_count / 40));
      setPage(next ? page + 1 : page - 1);
      if (next) {
        page + 1 <= Math.ceil(result.total_count / 40) ? refNext.current.disabled = false : refNext.current.disabled = true;
        refPrevious.current.disabled = false
      } else {
        page - 1 > 1 ? refPrevious.current.disabled = false : refPrevious.current.disabled = true;
        refNext.current.disabled = false;
      }
    } else {
      toastr.error("Não tem como realizar está ação na paginação!");
    }
  }

  return (
    <div className='container'>
      <div className="form-search">
        <h1>Listagem de repositórios</h1>
        <form>
          <input type="search" name="search" ref={refSearch} placeholder="Digite no mínino 3 sílabas" />
          <button type="submit" onClick={submitFormSearch}>Pesquisar</button>
        </form>
      </div>
      {data.length > 0 ?
        <>
          <h4 className="header-pages">Página: {page - 1}</h4>
          <div className="grid-all-repositories">
              {data.map(d => {
                return (
                  <Card 
                    key={d.id}
                    name={d.name}
                    url_img={d.owner.avatar_url}
                    login={d.owner.login}
                    type={d.owner.type}
                    visibility={d.visibility}
                    updated_at={d.updated_at}
                    url={d.html_url}
                    language={d.language}
                  />
                );
            })}
          </div>
          <div className='div-btns-paginate'>
            <button type='button' onClick={() => handlePagination(false)} ref={refPrevious}>Anterior</button>
            <button type='button' onClick={() => handlePagination(true)} ref={refNext}>Próximo</button>
          </div>
        </>
       
        : <p className='repositories-not-found'>Nenhum repositório encontrado...</p>}
    </div>
  );
}

export default App;
