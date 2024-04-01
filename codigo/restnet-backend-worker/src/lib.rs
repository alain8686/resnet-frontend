extern crate ring;
extern crate data_encoding;

use js_sys::{Boolean, WebAssembly::validate};
use worker::*;
use rand::Rng;
use ring::{digest, hmac::{self, Algorithm, HMAC_SHA256}};
use data_encoding::BASE64;


const SECRET_KEY: &[u8] = b"mine-secret-key";

pub fn generate_random_id(length: usize) -> String {
    const CHARSET: &[u8] = b"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charset_length = CHARSET.len();

    let mut rng = rand::thread_rng();

    let id: String = (0..length)
        .map(|_| {
            let index = rng.gen_range(0..charset_length);
            CHARSET[index] as char
        })
        .collect();
    id
}

fn calculate_hmac_signature(secret_key: &str) -> String {
    let payload = "test";
    let signed_key = hmac::Key::new(HMAC_SHA256, SECRET_KEY);
    let signature = hmac::sign(&signed_key, secret_key.as_bytes());
    BASE64.encode(signature.as_ref())
}

async fn upload(mut req: Request, ctx: RouteContext<()>) -> Result<Response>{
    let bucketResult = ctx.bucket("MODEL_BUCKET");
        let bucket = match bucketResult {
            Ok(bucket) => bucket,
            Err(_) => {
                return Err(Error::from("Failed to obtain file data"));
            }
        };

        let data = match req.bytes().await{
            Ok(data) => data,
            Err(_) => {
                return Err(Error::from("Failed to obtain file data"));
            }
        };
        let id = generate_random_id(15);
        let putMethod = bucket.put(id + ".jpeg", data);
        putMethod.execute().await;

        let mut headers = Headers::new();
                
        headers.set("Access-Control-Allow-Origin", "*");
        headers.set("Access-Control-Allow-Methods", "GET,PUT, HEAD,POST,OPTIONS");
        headers.set("Access-Control-Max-Age", "86400");
        headers.set("content-type", "application/octet-stream");

        let cors = Cors::new();
        let mut cors1 = &cors.with_methods([Method::Put, Method::Get]);

        Response::ok("ok")?.with_headers(headers).with_cors(cors1)
    
}


async fn queryImage(mut req: Request, ctx: RouteContext<()>) -> Result<Response>{
    let mut headers = Headers::new();
            
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "GET,PUT, HEAD,POST,OPTIONS");
    headers.set("Access-Control-Max-Age", "86400");
    headers.set("content-type", "application/octet-stream");
    let cors = Cors::new();
    let mut cors1 = &cors.with_methods([Method::Put, Method::Get]);

    //let api_key = req.headers().get("X-API-Key").unwrap().unwrap();
    //let hmac_signature = req.headers().get("X-HMAC-Signature").unwrap().unwrap();
    let valid = true; //hmac_signature == calculate_hmac_signature(&api_key);
    let id = ctx.param("id").unwrap();
    console_log!("{:?}", id);
    if valid {
        let bucketResult = ctx.bucket("MODEL_BUCKET");
        
        let bucket = match bucketResult {
            Ok(bucket) => bucket,
            Err(_) => {
                return Err(Error::from("Failed to obtain file data"));
            }
        };
        
        let query = bucket.get(id);
        let result = query.execute().await?;
        let bodyObj = result.unwrap();
        let body = bodyObj.body().unwrap();

        Response::from_bytes(body.bytes().await.unwrap())?.with_headers(headers).with_cors(cors1) 
    }
    else{
        Response::error("File not found", 404)?.with_headers(headers).with_cors(cors1)
    }

}


#[event(fetch)]
async fn main(req: Request, env: Env, _ctx: worker::Context) -> Result<Response> {
    let router = Router::new();
    router
        .put_async("/",  |mut req, ctx| async move {
            upload(req, ctx).await
        })
        .options_async("/", |req, ctx| async move {
            let cors = Cors::new();
            let mut cors1 = &cors.with_methods([Method::Put, Method::Get, Method::Head, Method::Delete, Method::Post, Method::Options]);

            let response = Response::ok("")?;
            let mut headers = response.headers().clone();
            headers.set("ALLOW", "GET,PUT, HEAD,POST,OPTIONS");
            headers.set("Access-Control-Allow-Origin", "*");
            headers.set("content-type", "application/octet-stream");        
            
            Ok(response.with_headers(headers).with_cors(cors1)?)       
        })
        .get_async("/files/:id", |req, ctx| async move {
            queryImage(req, ctx).await
        })
        .run(req, env)
        .await
}
