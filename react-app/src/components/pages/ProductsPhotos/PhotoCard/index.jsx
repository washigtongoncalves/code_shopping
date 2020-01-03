import React from 'react';

function PhotoCard(props) {
    const photo = props.photo;
    return (
        <div className="card text-center" 
             style={{ width: '18rem' }}>
                <img className="card-img-top" 
                    src={photo.photo_url}
                    alt={`Foto não carregada`} />
                <div className="card-body">
                    <button className="btn btn-sm btn-danger" 
                        onClick={() => props.handleClick(photo.id)}>
                        <i className="fa fa-trash-o"></i> Excluir #{photo.id}
                    </button>
                </div>
        </div>
    );
}
export default PhotoCard;
