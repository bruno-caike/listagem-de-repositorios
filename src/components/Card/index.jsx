export const Card = ({name, url_img, login, type, visibility, updated_at, url, language}) => {
    const update = new Date(updated_at);
    return (
        <a href={url} className='card-repositories' target="_blank">
            <article>
                <img src={url_img} alt={name} />
                <header>
                    <p>{Intl.DateTimeFormat('pt-BB').format(update)}</p>
                    <h2>{name}</h2>
                </header>
                <div>
                    <p><strong>Usuário: </strong>{login}</p>
                    <p><strong>Tipo: </strong>{type}</p>
                    <p><strong>Linguagem: </strong>{language}</p>
                    <p><strong>Repositório: </strong>{visibility}</p>
                </div>
            </article>
        </a>
    );
}