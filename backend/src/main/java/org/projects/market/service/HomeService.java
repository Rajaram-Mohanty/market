package org.projects.market.service;

import org.projects.market.model.Home;
import org.projects.market.model.HomeCategory;

import java.util.List;

public interface HomeService {
    public Home createHomePageData(List<HomeCategory> allCategories);
}
