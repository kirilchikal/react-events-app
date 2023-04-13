import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Photo, Profile } from "../models/profile";
import { store } from "./store";

export default class ProfileStore {
    profile: Profile | null = null;
    isLoading = false;
    isImageUploading = false;
    loading = false;

    constructor(){
        makeAutoObservable(this);
    }

    get isCurrentUser () {
        if (store.userStore.user && this.profile) {
            return store.userStore.user.userName === this.profile.username
        }
        return false;
    }

    loadProfile = async (username: string) => {
        this.isLoading = true;
        try {
            const profile = await agent.Profiles.get(username);
            runInAction(() => {
                this.profile = profile;
                this.isLoading = false;
            })
        } catch (err) {
            console.log(err);
            runInAction(() => this.isLoading = false);
        }
    }

    uploadImage = async (file: Blob) => {
        this.isImageUploading = true;
        try {
            const uploadResult = await agent.Profiles.uploadImage(file);
            const photo = uploadResult.data;
            runInAction(async () => {
                if (this.profile) {
                    this.profile.photos?.push(photo);
                    if (photo.isMain && store.userStore.user) {
                        store.userStore.setImage(photo.url);
                        this.profile.image = photo.url;
                    }
                }
                this.isImageUploading = false;
            })
        } catch (err) {
            console.log(err);
            runInAction(() => this.isImageUploading = false);
        }
    }

    setMainPhoto = async (photo: Photo) => {
        this.loading = true;
        try {
            await agent.Profiles.setMainPhoto(photo.id);
            store.userStore.setImage(photo.url);
            runInAction(() => {
                if (this.profile && this.profile.photos) {
                    this.profile.photos.find(p => p.isMain)!.isMain = false;
                    this.profile.photos.find(p => p.id === photo.id)!.isMain = true;
                    this.profile.image = photo.url;
                }
                this.loading = false
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    deletePhoto = async (photo: Photo) => {
        this.loading = true;
        try {
            await agent.Profiles.deletePhoto(photo.id);
            runInAction(() => {
                if (this.profile) {
                    this.profile.photos = this.profile.photos?.filter(p => p.id !== photo.id);
                }
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }
}