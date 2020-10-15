import Image from '../models/image';

export default {
	//Formatar o show de acordo com o que o front espera
	render(img: Image){
		return {
            id: img.id,
            url : `${process.env.API_ENDPOINT}/uploads/${img.path}`,
		};
	},
	renderMany(imgs: Image[]){
		return imgs.map(img => this.render(img));
	}
};