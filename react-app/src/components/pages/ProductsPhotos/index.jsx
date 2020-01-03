import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import $ from 'jquery';

import PhotoCard from './PhotoCard';
import PhotoDeleteModal from './PhotoDeleteModal';

import ProductsPhotosService from '../../../services/ProductsPhotosService';
import NotifyMessageService from '../../../services/NotifyMessageService';

const INITIAL_STATE = {
    blocking: true,
    productId: null,
    product: [],
    photos: []
};
const DELETE_MODAL_ID = 'photo-delete-modal';
class ProductsPhotos extends Component {

    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
        this.state.productId = props.match.params.id;
        this.modalDelete = null;
        this.notify = new NotifyMessageService();
    }

    componentWillMount() {
        this.getPhotos();
    }

    componentDidMount = () => {
        this.modalDelete = $(`#${DELETE_MODAL_ID}`);
    }

    getPhotos = () => {
        this.setState(
            state => state.blocking = true,
            async () => {
                const { data } = await ProductsPhotosService.getPhotos(this.state.productId);
                const { product, photos } = data.data;
                this.setState(state => {
                    state.product  = product;
                    state.photos   = photos;
                    state.blocking = false;
                    return state;
                });
            } 
        );
    }

    deletePhoto = async (photoId) => {
        await ProductsPhotosService.delete(this.state.productId, photoId);
        this.modalDelete.modal('hide');
        this.setState(
            state => state.photoToDelete = null,
            () => {
                this.getPhotos();
                this.notify.success(`Foto ${photoId} excluída com sucesso.`);
            }
        );
    }

    showModalDelete = (photoId) => {
        this.setState(
            state => state.photoToDelete = photoId,
            () => this.modalDelete.modal('show')
        );
    }

    render() {
        const { product } = this.state;
        return (
            <BlockUi tag="div" blocking={this.state.blocking} className="row" id="no-more-tables">
                <h3>Fotos do produto {product.name}</h3>
                <div className="col-md-12" style={{ marginBottom: '10px' }}>
                    <button className="btn btn-primary" 
                        onClick={() => this.modalLink.modal('show')}>
                        Enviar foto
                    </button>
                    <Link to="/products/list">
                        <button className="btn">
                            Voltar
                        </button>
                    </Link>
                </div>
                <div className="col-md-12">
                    {this.state.photos.map(photo => (
                        <PhotoCard 
                            photo={photo} 
                            key={photo.id}
                            handleClick={this.showModalDelete} />
                    ))}
                </div>
                <PhotoDeleteModal 
                    modalId={DELETE_MODAL_ID}
                    photo={this.state.photoToDelete}
                    handleClick={this.deletePhoto} />
            </BlockUi>
        );
    }
}
export default ProductsPhotos;
