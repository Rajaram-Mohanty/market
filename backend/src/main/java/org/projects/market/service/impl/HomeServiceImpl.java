package org.projects.market.service.impl;

import lombok.RequiredArgsConstructor;
import org.projects.market.domain.HomeCategorySection;
import org.projects.market.model.Deal;
import org.projects.market.model.Home;
import org.projects.market.model.HomeCategory;
import org.projects.market.repository.DealRepository;
import org.projects.market.service.HomeService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HomeServiceImpl implements HomeService {

    private final DealRepository dealRepository;

    @Override
    public Home createHomePageData(List<HomeCategory> allCategories) {
        // Filter categories into separate lists based on their section type
        List<HomeCategory> gridCategories = allCategories.stream()
                .filter(category -> category.getSection() == HomeCategorySection.GRID)
                .collect(Collectors.toList());

        List<HomeCategory> shopByCategories = allCategories.stream()
                .filter(category -> category.getSection() == HomeCategorySection.SHOP_BY_CATEGORIES)
                .collect(Collectors.toList());

        List<HomeCategory> electricCategories = allCategories.stream()
                .filter(category -> category.getSection() == HomeCategorySection.ELECTRIC_CATEGORIES)
                .collect(Collectors.toList());

        List<HomeCategory> dealCategories = allCategories.stream()
                .filter(category -> category.getSection() == HomeCategorySection.DEALS)
                .collect(Collectors.toList());

        // Handle the creation and fetching of Deals
        List<Deal> createdDeals;

        if (dealRepository.findAll().isEmpty()) {
            List<Deal> deals = dealCategories.stream()
                    .map(category -> {
                        Deal deal = new Deal();
                        deal.setCategory(category);
                        deal.setDiscount(10); // Default discount
                        return deal;
                    }).collect(Collectors.toList());
            createdDeals = dealRepository.saveAll(deals);
        } else {
            createdDeals = dealRepository.findAll();
        }

        // Combine all lists into a single Home object
        Home home = new Home();
        home.setGrid(gridCategories);
        home.setShopByCategories(shopByCategories);
        home.setElectricCategories(electricCategories);
        home.setDeals(createdDeals);
        home.setDealCategories(dealCategories);

        return home;
    }
}
