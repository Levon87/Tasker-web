import { BaseModel } from '../../_base/crud';
import { Address } from './address.model';
import { SocialNetworks } from './social-networks.model';

export class User extends BaseModel {
    id: number;
    username: string;
    password: string;
	email: string;
	data: {
		accessToken: string;
		expiresIn: number;
		refreshToken: string;
	};
	accessToken: string;
	expiresIn: number;
    refreshToken: string;
    roles: number[];
    pic: string;
    fullname: string;
    occupation: string;
	companyName: string;
	phone: string;
    address: Address;
    socialNetworks: SocialNetworks;

    clear(): void {
        this.id = undefined;
		this.username = '';
		this.expiresIn = 0;
        this.password = '';
        this.email = '';
        this.roles = [];
		this.fullname = '';
		this.data.accessToken = 'access-token-' + Math.random();
		this.data.refreshToken = 'access-token-' + Math.random();
		this.data.expiresIn = 0;
        this.accessToken = 'access-token-' + Math.random();
        this.refreshToken = 'access-token-' + Math.random();
        this.pic = './assets/media/users/default.jpg';
        this.occupation = '';
        this.companyName = '';
        this.phone = '';
        this.address = new Address();
        this.address.clear();
        this.socialNetworks = new SocialNetworks();
        this.socialNetworks.clear();
    }
}
