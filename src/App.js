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
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const refSearch = useRef(null);

  const submitFormSearch = async (e) => {
    e.preventDefault();
    const search = refSearch.current.value;
    if (search.length >= 3) {
      const result = await SearchRepositories(search, page, "updated");
      setData(result.items);
      setTotalPages(Math.ceil(result.total_count / 40));
      setPage(page + 1);
      toastr.success("Busca efetuada com sucesso")
    } else {
      toastr.error("Digite no mínimo 3 sílabas!")
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
        : <p>Nenhum repositório listado...</p>}
    </div>
  );
}

export default App;
