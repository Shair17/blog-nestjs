import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { Setting } from './setting.entity';

@Injectable()
export class SettingService {
	constructor(
		@InjectRepository(Setting)
		private readonly settingRepository: Repository<Setting>,
		private readonly userService: UserService
	) {}

	async findAll(innerInvoke = false, isAdmin = false): Promise<Setting> {
		const data = await this.settingRepository.find();
		const res = data[0];

		if (!res) {
			return {} as Setting;
		}

		if (innerInvoke || isAdmin) {
			return res;
		}

		const filterRes = [
			'systemUrl',
			'systemTitle',
			'systemLogo',
			'systemFavicon',
			'systemFooterInfo',
			'seoKeyword',
			'seoDesc',
		].reduce((a, c) => {
			a[c] = res[c];
			return a;
		}, {}) as Setting;

		return filterRes;
	}

	async update(setting: Partial<Setting>): Promise<Setting> {
		const old = await this.settingRepository.find();

		const updatedTag =
			old && old[0]
				? this.settingRepository.merge(old[0], setting)
				: this.settingRepository.create(setting);
		return this.settingRepository.save(updatedTag);
	}
}
