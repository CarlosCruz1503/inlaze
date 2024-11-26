// src/imdb/imdb.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'; 
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ConfigService } from '@nestjs/config';
import { query } from 'express';
@Injectable()
export class ImdbService {
    constructor(private readonly httpService: HttpService) { }

    getMovies(queryParams: any): Observable<any> {
        console.log(queryParams)
        let params = ''
        if (queryParams) {
            let claves = Object.keys(queryParams); 
            for (let i = 0; i < claves.length; i++) {
                let clave = claves[i];
                if (!params.includes('?')) {
                    params += `?${claves[i]}=${queryParams[clave]}`
                } else {
                    params += `&${claves[i]}=${queryParams[clave]}`
                }
            }
        }
    
        const url = `https://api.themoviedb.org/3/discover/movie${params}`;
        console.log(url)
        return this.httpService.get(url, {

            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.imdb_token}`
            }
        }
        ).pipe(
            map(response => response.data),
            catchError(error => {
                throw new Error('Failed to fetch data from the external API');
            }),
        );
    }

    getMoviesByIdOrCategory(id: string, queryParams: any): Observable<any> {
        let params = ''
        if (queryParams) {
            let claves = Object.keys(queryParams);
            for (let i = 0; i < claves.length; i++) {
                let clave = claves[i];
                if (!params.includes('?')) {
                    params += `?${claves[i]}=${queryParams[clave]}`
                } else {
                    params += `&${claves[i]}=${queryParams[clave]}`
                }
            }
        }
        const url = `https://api.themoviedb.org/3/movie/${id}${params}`;
        console.log(url)
        return this.httpService.get(url, {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.IMDB_TOKEN}`
            }
        }).pipe(
            map(response => response.data),
            catchError(error => {
                throw new Error('Failed to fetch data from the external API');
            })
        );
    }

    getMoviesIdFilter(id: string, idFilter:string): Observable<any> {

        console.log(id)
        console.log(idFilter)
        const url = `https://api.themoviedb.org/3/movie/${id}/${idFilter}`;
        console.log(url)
        return this.httpService.get(url, {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.IMDB_TOKEN}`
            }
        }).pipe(
            map(response => response.data),
            catchError(error => {
                throw new Error('Failed to fetch data from the external API');
            })
        );
    }
    getSearchMovies(queryParams: any): Observable<any> {
        console.log(queryParams)
        let params = ''
        if (queryParams) {
            let claves = Object.keys(queryParams); 
            for (let i = 0; i < claves.length; i++) {
                let clave = claves[i];
                if (!params.includes('?')) {
                    params += `?${claves[i]}=${queryParams[clave]}`
                } else {
                    params += `&${claves[i]}=${queryParams[clave]}`
                }
            }
        }
    
        const url = `https://api.themoviedb.org/3/search/movie${params}`;
        console.log(url)
        return this.httpService.get(url, {

            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.imdb_token}`
            }
        }
        ).pipe(
            map(response => response.data),
            catchError(error => {
                throw new Error('Failed to fetch data from the external API');
            }),
        );
    }

    getGenreMovies(queryParams: any): Observable<any> {
        let params = ''
        if (queryParams) {
            let claves = Object.keys(queryParams); 
            for (let i = 0; i < claves.length; i++) {
                let clave = claves[i];
                if (!params.includes('?')) {
                    params += `?${claves[i]}=${queryParams[clave]}`
                } else {
                    params += `&${claves[i]}=${queryParams[clave]}`
                }
            }
        }
        const url = `https://api.themoviedb.org/3/genre/movie/list${params}`;
        console.log(url)
        return this.httpService.get(url, {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.IMDB_TOKEN}`
            }
        }).pipe(
            map(response => response.data),
            catchError(error => {
                throw new Error('Failed to fetch data from the external API');
            })
        );
    }

}
