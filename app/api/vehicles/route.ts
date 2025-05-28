import { NextRequest, NextResponse } from 'next/server'
import { getAllVehicles, getFeaturedVehicles, getFilteredVehicles } from '@/lib/contentful-api'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const category = searchParams.get('category')
    const brand = searchParams.get('brand')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const passengers = searchParams.get('passengers')
    const minYear = searchParams.get('minYear')
    const maxYear = searchParams.get('maxYear')
    const sort = searchParams.get('sort')
    const page = searchParams.get('page')
    const pageSize = searchParams.get('pageSize')

    let result

    if (type === 'featured') {
      result = await getFeaturedVehicles()
    } else if (type === 'filtered') {
      const params = {
        category: category || undefined,
        brand: brand || undefined,
        minPrice: minPrice ? parseInt(minPrice) : undefined,
        maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
        passengers: passengers ? parseInt(passengers) : undefined,
        minYear: minYear ? parseInt(minYear) : undefined,
        maxYear: maxYear ? parseInt(maxYear) : undefined,
        sort: sort || undefined,
        page: page ? parseInt(page) : undefined,
        pageSize: pageSize ? parseInt(pageSize) : undefined,
      }
      result = await getFilteredVehicles(params)
    } else {
      result = await getAllVehicles()
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch vehicles' },
      { status: 500 }
    )
  }
}