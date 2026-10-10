export default async function handler(req,res){
  if(req.method!== 'POST') return res.status(405).end();
  const {email, shopify_url} = req.body;
  const brevoRes = await fetch('https://api.brevo.com/v3/contacts', {
    method:'POST',
    headers:{
      'api-key': process.env.BREVO_API_KEY,
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      email,
      attributes:{SHOPIFY_URL: shopify_url},
      listIds:[6],
      updateEnabled:true
    })
  });
  const data = await brevoRes.json();
  return res.status(200).json(data);
}
